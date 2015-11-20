# semikolon-opd

Outpatient Department Management System for Hospital



## Dependencies

Meteor packages and related documentations.

### packages

UI and presentation logic

- [BlazeComponets](https://github.com/peerlibrary/meteor-blaze-components) - extensible blaze template
- [BlazeLayout](https://github.com/kadirahq/blaze-layout) - layout manager
- [Materialize](http://materializecss.com/) - UI framework for structuring view components
- [Sass](http://sass-lang.com/) - CSS with superpowers



Routing and Data flow

- [FlowRouter](https://github.com/kadirahq/flow-router) - reactive router for url path specification
- [Dispatcher](https://github.com/worona/meteorflux/tree/devel/packages/dispatcher) - data flow handler
- [ReactiveDict](http://meteorcapture.com/a-look-at-local-template-state/) - reactive dictionary for holding template state



Schema and form

- [SimpleSchema](https://github.com/aldeed/meteor-simple-schema) - collection and form schema
- [Collection2](https://github.com/aldeed/meteor-collection2) - extends Mongo.Collection to provide support for specifying a schema
- [AutoForm](https://github.com/aldeed/meteor-autoform) - automatically generate form with validation related to schema (which is not needed to be an collection)



## How to

This section explains how to contribute this project productively.

### Create a form

This topic will use patient page as an example. We use autoform to generate functional form from a schema or collection. Let's look at this template



``` html
<!-- /client/templates/appointment/patient-auth.html -->

<template name="PatientAuth">
		<div class="row">
			<div class="col s10 offset-s1 m6 offset-m3 l4 offset-l4">
				<div class="valign-wrapper" style="margin-top: 200px;">
					<div class="valign" style="width: 100%">

						{{#autoForm collection="OPD.Schema.Patients" id="appointmentForm"  type="insert"}}
							{{> afQuickField name='ssid'}}
							{{> afQuickField name='lastName'}}
							{{> afQuickField name='action'}}
							<button type="submit" class="waves-effect waves-light btn">										นยัน
                      		</button>
						{{/autoForm}}
					
					</div>
				</div>
			</div>
		</div>
</template>
```



You'll see `collection="OPD.Model.Patients"` which telling that this form is based on Patients model (which has a schema attached to it). `id="appointmentForm"` is the form id, you need to assign id to every form in the application, otherwise it will mess you up. The last one is `type="insert" `which indicate function of the form, I'll talk more about this later but for now this form has a functionality to create new patient.



``` javascript
// /packages/opd-model/schemas/patients-schema.js
Schema.Patients = new SimpleSchema({
    ssid: {
      type: String,
      label: "รหัสบัตรประชาชน",
      max: 13,
      optional: true
    },
    hn: {
      type: String,
      label: "รหัสผู้ป่วย",
      max: 13,
      optional: true
    },
    firstName: {
      type: String,
      label: "ชื่อ",
      max: 200
    },
    lastName: {
      type: String,
      label: "นามสกุล",
      max: 200
    }
});

Model.Patients.attachSchema(Schema.Patients);
```

This file is a collection schema which tells the form above about presentation and validation. And now you can already create a form that can create new patient.



But this is not enough.

Sometimes we need to do something more advance. In fact, our front-page's purpose is not for creating new patient but for authenticating patients and decide what is the next action patient want to do

``` html
{{#autoForm schema="OPD.Schema.PatientAuthForm" id="appointmentForm" type="method" meteormethod="Patients.auth" resetOnSuccess=false}}
	{{> afQuickField name='ssidOrHn'}}
	{{> afQuickField name='firstName'}}
	{{> afQuickField name='lastName'}}
	{{> afQuickField name='action' value='make'}}
	<button type="submit" class="waves-effect waves-light btn">ดำเนินการต่อ</button>
{{/autoForm}}
```



First, you might spot  `schema="OPD.Schema.PatientAuthForm"` which is not collection but schema. We can create a schema to support a custom form to do something more advance than just create and update. This form schema is located on `/form-schema/patient-auth-form.js` but there's nothing special except no attachment like the one above and `ssidOrHn` field instead of `ssid` and `hn` separated since we need a field that accept both ssid and hn.

`type="method"` telling that this form submission will call method which can be declared by



``` javascript
Meteor.method({
  'methodName'() {
    return 'anything you want';
  }
});
```



But you'll see that the method name that this form call on submit is `meteormethod="Patients.auth"`. The method has it's own namespace which is telling that this method is in Patients model.

``` javascript
// /packages/opd-model/models/patients.js

let Patients = Model.Patients = new Meteor.Collection('patients');

Meteor.methods({
	'Patients.auth'(doc) {
		// doc is an object which contains field value
      	// you can access the data like doc.firstName for instance
	}

});
```

You can apply any logic you want to in this function block. and if you want to return something back to user you'll need the `Dispatcher`

``` javascript
Dispatcher.dispatch('PATIENT_MAKE_APPOINTMENT_REQUEST', {patientId: '1hh3IOSa22'});
```

This is called **action** with a payload attached to. We have to register an action listener to react to actions.

***IMPORTANT*: you have to use `return` statement to end the execution in the block, or it might execute the rest and have some unexpected outcome**



``` javascript
// /client/templates/appointment/patient-auth.js

// let Patients = OPD.Model.Patients;
let newAppointmentPath = '/appointment/new';

class PatientAuth extends BlazeComponent {
  onCreated() {
    super.onCreated();

    this.state = new ReactiveDict();
    this.state.set('require_otp', false);

    registerDispatcher(this.state);
  }

  isRequireOTP() {
    return this.state.get('require_otp');
  }
}

// Action dispatcher for this component

function registerDispatcher(state) {

  Dispatcher.register(action => {
      switch( action.type ) {
        case "PATIENT_MAKE_APPOINTMENT_REQUEST":
          FlowRouter.go(newAppointmentPath);
          break;

        case "PATIENT_REQUIRE_OTP":
          state.set('require_otp', true);
          break;
      }
    });

}

PatientAuth.register('PatientAuth');
```

This file is also used to declare presentation logic ( see [BlazeComponets](https://github.com/peerlibrary/meteor-blaze-components) )



``` javascript
// /routes.js

FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render("MainLayout", {content: "PatientAuth"});
  }
});

FlowRouter.route('/appointment/new', {
  action: function() {
    BlazeLayout.render("MainLayout", {content: "MakeAppointment"});
  }
});
```



This code shows routing logic which will render MainLayout that include dynamic template



``` html
<template name="MainLayout">
  <header></header>
  <main>
	  <div class="container">
	    {{>Template.dynamic template=content}}
    </div>
  </main>
  <footer></footer>
</template>
```



#### conclusion

We can create form that can do various of things easily by specify the method to call or normal form that can create and update database collection by using `SimpleSchema` to specify field and validation and use `autoForm` to generate the UI FTW.





