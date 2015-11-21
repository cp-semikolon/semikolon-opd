Meteor.startup(() => {
  process.env.MAIL_URL =  
    'smtp://postmaster%40sandboxaab61dbedd9e45759d68786baff23aa3.mailgun.org' +
    ':2f515b5469178616deb0c41e97e3c934@smtp.mailgun.org:587';
});