#!/usr/bin/python

'''
EMAIL SCRIPT
'''
import cgi, time, os
import ConfigParser
import smtplib
from email.mime.text import MIMEText

def send_email(username, password, server, to_address, reply_to_address, subject, body):
    msg = MIMEText(body)
    msg['Subject'] = subject
    msg['From'] = username
    msg['To'] = to_address
    msg.add_header('reply-to', reply_to_address)

    s = smtplib.SMTP(server, 587)
    s.ehlo()
    s.starttls()
    s.ehlo
    s.login(username, password)
    s.sendmail(username, [to_address], msg.as_string())
    s.quit()

def application(environ, start_response):
    # Get Fields
    environ.setdefault('QUERY_STRING', '')
    fields = cgi.FieldStorage(fp=environ['wsgi.input'],
                              environ=environ,
                              keep_blank_values=1)
    
    # Format Message Components
    reply_to_address = fields.getvalue("reply_to")
    phone_number = fields.getvalue("phone_number")
    body = "Name {0}\n".format(fields.getvalue("name"))
    if phone_number:
        body = "Phone number: {0}".format(phone_number)
    else:
        body = "No Phone Number Provided"
    body += "\n\n\n"
    body += fields.getvalue("message")

    # Send Message
    config = ConfigParser.RawConfigParser()
    dirname = os.path.dirname(__file__)
    config.read(os.path.join(dirname,'mail.cfg'))
    send_email(config.get("MAIL_CONFIG", "USERNAME"),
               config.get("MAIL_CONFIG", "PASSWORD"),
               config.get("MAIL_CONFIG", "SMTP_SERVER"),
               config.get("MAIL_CONFIG", "TO_ADDRESS"),
               reply_to_address,
               config.get("MAIL_CONFIG","SUBJECT"),
               body)

    # Send HTTP response
    status = '200 OK'
    output = "Email Sent"
    response_headers = [('Content-type', 'text/plain'),
                        ('Content-Length', str(len(output)))]

    start_response(status, response_headers)
    
    return [output]
