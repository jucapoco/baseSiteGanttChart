from channels import route
from channels import include
from channels import Channel
import json


# This function will display all messages received in the console
def message_handler(message):
    print(message['text'])


channel_routing = [
    #Default message handler
    route("websocket.receive", 'jcvrbaseapp.consumers.ws_echo'),
    #route("websocket.receive", message_handler),
    # Include sub-routing from an app.
    include("jcvrbaseapp.routing.websocket_routing", path=r"^/chat"),

    # Custom handler for message sending (see Room.send_message).
    # Can't go in the include above as it's not got a 'path' attribute to match on.
    include("jcvrbaseapp.routing.custom_routing"),

    # A default "http.request" route is always inserted by Django at the end of the routing list
    # that routes all unmatched HTTP requests to the Django view system. If you want lower-level
    # HTTP handling - e.g. long-polling - you can do it here and route by path, and let the rest
    # fall through to normal views.
]
