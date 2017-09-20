from channels import route
from .consumers import ws_connect, ws_receive, ws_disconnect, chat_join, chat_leave, chat_send, chat_join2, chat_leave2, ws_connect2, ws_disconnect2


# There's no path matching on these routes; we just rely on the matching
# from the top-level routing. We could path match here if we wanted.
websocket_routing = [
    # Called when WebSockets connect
    route("websocket.connect", ws_connect2),

    # Called when WebSockets get sent a data frame
    #route("websocket.receive", ws_receive),

    # Called when WebSockets disconnect
    route("websocket.disconnect", ws_disconnect2),
]

# You can have as many lists here as you like, and choose any name.
# Just refer to the individual names in the include() function.
custom_routing = [
    # Handling different chat commands (websocket.receive is decoded and put
    # onto this channel) - routed on the "command" attribute of the decoded
    # message.
    route("jcvrbaseapp.receive", chat_join2, command="^join$"),
    route("jcvrbaseapp.receive", chat_leave2, command="^leave$"),
    route("jcvrbaseapp.receive", chat_send, command="^send$"),
]
