#!/usr/bin/python

CONFIG_NAME    = "mail.cfg"
CONFIG_SECTION = "MAIL_CONFIG"

'''
EMAIL SCRIPT
'''
import cgi, time, os
import ConfigParser
import smtplib
from email.mime.text import MIMEText

def send_email(config, reply_to_address, message_body):

    # Get Config Values
    username    = config.get(CONFIG_SECTION, "USERNAME")
    password    = config.get(CONFIG_SECTION, "PASSWORD")
    smtp_server = config.get(CONFIG_SECTION, "SMTP_SERVER")
    to_address  = config.get(CONFIG_SECTION, "TO_ADDRESS")
    subject     = config.get(CONFIG_SECTION, "SUBJECT")
 
    # Format Message
    email = MIMEText(message_body, 'html')
    email['Subject'] = subject
    email['From'] = username
    email['To'] = to_address
    email.add_header('Reply-To', reply_to_address)
    
    # Send Message
    s = smtplib.SMTP(smtp_server, 587)
    s.ehlo()
    s.starttls()
    s.ehlo
    s.login(username, password)
    s.sendmail(username, [to_address], email.as_string())
    s.quit()


def format_message(fields):
    # Email Address
    reply_to_address = fields.getfirst("reply_to","")
    
    # Phone Number
    phone_number = fields.getfirst("phone_number","")
    
    # Note
    note_html_part = "<div style = 'padding-bottom:20px; font-style:italic;'>{0}</div>"
    note = "This person didn't leave a{missing}, you need to <strong>{action}</strong>!"
    if not reply_to_address:
        reply_to_address = "(No Email Provided)"
        note_html_part = note_html_part.format(note.format(missing = "n email address",
                                                           action = "call them"))
    elif not phone_number:
        phone_number = "(No Phone Number Provided)"
        note_html_part = note_html_part.format(note.format(missing = " phone number",
                                                           action = "email them"))
    else:
        note_html_part = ""

    # Message
    message_html_part = ""
    for line in fields.getvalue("message").splitlines():
        message_html_part += "<p style = 'font-size:12ptmargin:0;padding:0;padding-bottom:5px'>{0}</p>".format(line)
    

    # HTML
    message_body = """\
<!doctype html>
<html>
  <head><title>Email</title></head>
  <body>
    {note}
    <h1 style = 'font-size:10pt; text-decoration:underline;'>Message:</h1>
    <div style = 'font-size:12pt;'>
      {msg_body}
    </div>
    <div style = 'margin:0; padding-top:12px; margin-bottom:20px;'>
      <h1 style = 'font-size:10pt;text-decoration:underline;'>Author's Info:</h1>
      <ul style = 'list-style:none; margin:0; padding:0;'>
        <li style = 'margin:0; padding:0; padding-right:10px; font-size:10pt;'><h2 style = 'display:inline; font-size:inherit;'>Name : </h2><span>{name}</span></li>
        <li style = 'margin:0; padding:0; padding-right:10px; font-size:10pt;'><h2 style = 'display:inline; font-size:inherit;'>Email : </h2><span>{email}</span></li>
        <li style = 'margin:0; padding:0; padding-right:10px; font-size:10pt;'><h2 style = 'display:inline; font-size:inherit;'>Phone : </h2><span>{phone_number}</span></li>
      </ul>
    </div>
  </body>
</html>
"""
 
    return message_body.format(name=fields.getvalue("name"),
                               email=reply_to_address,
                               phone_number=phone_number,
                               note=note_html_part,
                               msg_body=message_html_part)


def application(environ, start_response):
    # Get Response Ready
    status = "200 OK"
    output = "Email Sent"
    response_headers = [('Content-type', 'text/plain'),
                        ('Content-Length', str(len(output)))]

    # Get Fields
    environ.setdefault('QUERY_STRING', '')
    fields = cgi.FieldStorage(fp=environ['wsgi.input'],
                              environ=environ,
                              keep_blank_values=1)


    # Validate Args

    # Anti Spam Measure
    if fields.getfirst("body",""):
        start_response(status, response_headers)
        output += "blah"
        return [output]

    for arg in ["name", "message"]:
        if arg not in fields.keys():
            output += "blah"
            start_response(status, response_headers)        
            return [output]

    if "reply_to" not in fields.keys() and "phone_number" not in fields.keys():
        output += "blah"
        start_response(status, response_headers)        
        return [output]        
    

    # Format and Send Message
    message_body = format_message(fields)

    config = ConfigParser.RawConfigParser()
    dirname = os.path.dirname(__file__)
    config.read([os.path.join(dirname,CONFIG_NAME)])

    send_email(config, fields.getvalue("reply_to",""), message_body)


    # Send HTTP response
    start_response(status, response_headers)        
    return [output]


