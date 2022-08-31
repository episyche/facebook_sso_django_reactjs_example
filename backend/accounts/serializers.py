from django.conf import settings
from rest_framework import serializers
from library.sociallib import facebook
from library.register.register import register_social_user
from rest_framework.exceptions import*


class FacebookSocialAuthSerializer(serializers.Serializer):
    """Handles serialization of facebook related data"""
    auth_token = serializers.CharField()

    def validate_auth_token(self, auth_token):
        user_data = facebook.Facebook.validate(auth_token)

        try:
            user_id = user_data['id']
            email = user_data['email']
            name = user_data['name']
            provider = 'facebook'
        except:

            raise serializers.ValidationError(
                'The token  is invalid or expired. Please login again.'
            )
        return register_social_user(
            provider=provider, user_id=user_id, email=email, name=name)