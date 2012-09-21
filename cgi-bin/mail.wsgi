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
    username    = config.get("MAIL_CONFIG", "USERNAME")
    password    = config.get("MAIL_CONFIG", "PASSWORD")
    smtp_server = config.get("MAIL_CONFIG", "SMTP_SERVER")
    to_address  = config.get("MAIL_CONFIG", "TO_ADDRESS")
    subject     = config.get("MAIL_CONFIG", "SUBJECT")
 
    # Format Message
    email = MIMEText(message_body)
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
    reply_to_address = fields.getvalue("reply_to","")
    phone_number = fields.getfirst("phone_number","")

    message_body = "Name: {0} | ".format(fields.getvalue("name"))

    if phone_number:
        message_body += "Phone number: {0}".format(phone_number)
    else:
        message_body += "(No Phone Number Provided)"



    message_body += "\n\n"
    message_body += fields.getvalue("message")

    return (reply_to_address, message_body)


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
    if "body" in fields.keys():
        start_response(status, response_headers)        
        return [output]

    for arg in ["name", "message"]:
        if arg not in fields.keys():
            start_response(status, response_headers)        
            return [output]

    if "reply_to" not in fields.keys() and "phone_number" not in fields.keys():
        start_response(status, response_headers)        
        return [output]        
    

    # Format and Send Message
    reply_to_address, message_body = format_message(fields)

    config = ConfigParser.RawConfigParser()
    dirname = os.path.dirname(__file__)
    config.read([os.path.join(dirname,'mail.cfg')])

    send_email(config, reply_to_address, message_body)


    # Send HTTP response
    start_response(status, response_headers)        
    return [output]


