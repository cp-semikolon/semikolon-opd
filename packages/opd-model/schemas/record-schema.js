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
      type: Schema.HealthData
    },
    Med:{
      type: Schema.MedData
    },
    Dispense:{
      type: [Schema.Dispenses]
    },
    DispensesStatus:{
      type: String,
      label: "สถานะจ่ายยา",
      allowedValues: ['0', '1'] //1 = สำเร็จ 
    }
});

Model.Record.attachSchema(Schema.Record);