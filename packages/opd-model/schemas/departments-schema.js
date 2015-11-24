Schema.Departments = new SimpleSchema({
    Name: {
      type: String,
      label: 'ชื่อแผนก',
      max: 50,
      unique: true
    }
});

Model.Departments.attachSchema(Schema.Departments);