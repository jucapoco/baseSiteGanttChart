import re
from django.utils.safestring import mark_safe
from django import template
from django.template.defaultfilters import stringfilter
import logging
import html.parser
from django.contrib.auth.models import Group


register = template.Library()


class_re = re.compile(r'(?<=class=["\'])(.*)(?=["\'])')
role_re = re.compile(r'(?<=role=["\'])(.*)(?=["\'])')

@register.filter(name='add_class')
def add_class(value, css_class):
    string = unicode(value)
    match = class_re.search(string)
    if match:
        m = re.search(r'^%s$|^%s\s|\s%s\s|\s%s$' % (css_class, css_class, css_class, css_class), match.group(1))
        #print match.group(1)
        if not m:
            return mark_safe(class_re.sub(match.group(1) + " " + css_class, 
                                          string))
    else:
        return mark_safe(string.replace('>', ' class="%s">' % css_class))
    return value


@register.filter(name='add_role')
def add_role(value, css_role):
    string = unicode(value)
    match = class_re.search(string)
    if match:
        m = re.search(r'^%s$|^%s\s|\s%s\s|\s%s$' % (css_role, css_role,
            css_role, css_role), match.group(1))
        #print match.group(1)
        if not m:
            return mark_safe(role_re.sub(match.group(1) + " " + css_role, 
                                          string))
    else:
        return mark_safe(string.replace('>', ' role="%s">' % css_role))
    return value


@register.filter(name='pretty_checkbox')
@stringfilter
def pretty_checkbox(value):
    # Iterate over the HTML fragment, extract <label> and <input> tags, and
    # switch the order of the pairs where the input type is "checkbox".
    scratch = value
    output = ''
    try:
        while True:
            ls = scratch.find('<label')
            if ls > -1:
                le = scratch.find('</label>')
                ins = scratch.find('<input')
                ine = scratch.find('/>', ins)
                # Check whether we're dealing with a checkbox:
                if scratch[ins:ine + 2].find(' type="checkbox" ') > -1:
                    # Switch the tags
                    output += scratch[:ls]
                    output += scratch[ins:ine + 2] + ' '
                    output += scratch[ls:le - 1] + scratch[le:le + 8]
                else:
                    output += scratch[:ine + 2]
                scratch = scratch[ine + 2:]
            else:
                output += scratch
                break
    except:
        logging.error("pretty_checkbox caught an exception")
    html_parser = html.parser.HTMLParser()
    unescaped = html_parser.unescape(output)
    return unescaped


@register.filter(name='has_group')
def has_group(user, group_name):
    group = Group.objects.get(name=group_name)
    return group in user.groups.all()
