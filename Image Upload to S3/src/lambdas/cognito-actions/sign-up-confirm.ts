export const handler = async (event, context, callback)=> 
{
   try
   {
      event.response.autoConfirmUser = true;

      if(event.request.userAttributes.hasOwnProperty("email")) 
      {
         event.response.autoVerifyEmail = true;
      }

      if(event.request.userAttributes.hasOwnProperty("phone_number")) 
      {
         event.response.autoVerifyPhone = true;
      }
      callback(null, event);
   }
   catch(err)
   {
      callback(null, event);
   }
};
