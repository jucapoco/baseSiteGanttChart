from django.db import models
from django.utils import timezone
from django.utils.six import python_2_unicode_compatible
from channels import Group
from basesite.settings import MSG_TYPE_MESSAGE
import json


class baseIndex(models.Model):
    userWelcome = models.ForeignKey('auth.user')
    welcomeDate = models.DateTimeField(default=timezone.now)
    welcomeText = models.CharField(max_length=200)

    def publish(self):
        self.save()

    def __str__(self):
        return self.welcomeText


@python_2_unicode_compatible
class Room(models.Model):
    """
    A room for people to chat in.
    """

    # Room title
    title = models.CharField(max_length=255)

    # If only "staff" users are allowed (is_staff on django's User)
    staff_only = models.BooleanField(default=False)

    def str(self):
        return self.title

    @property
    def websocket_group(self):
        """
        Returns the Channels Group that sockets should subscribe to to get sent
        messages as they are generated.
        """
        return Group("room-%s" % self.id)

    def send_message(self, message, user, msg_type=MSG_TYPE_MESSAGE):
        """
        Called to send a message to the room on behalf of a user.
        """
        final_msg = {'room': str(self.id), 'message': message, 'username': user.username, 'msg_type': msg_type}

        # Send out the message to everyone in the room
        self.websocket_group.send(
            {"text": json.dumps(final_msg)}
        )
