Schema.Record = new SimpleSchema({
    patientid:{
      type: String,
      max: 50
    },
    doctorid:{
      type:String,
      max:50
    },
    Date: {
      type: Date,
      label: "วันที่รักษา"
    },
    Time:{
      type: String,
      label:"ช่วงเวลา",
      max: 50
    },
    Health:{
      type: Schema.HealthData,
      optional:true
    },
    Med:{
      type: Schema.MedData
    },
    Dispense:{
      type: [Schema.Dispenses]
    },
    DispensesStatus:{
      type: Boolean,
      label: "สถานะจ่ายยา"
    }
});

Model.Record.attachSchema(Schema.Record);