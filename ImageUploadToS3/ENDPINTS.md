# Cognito actions. Sign-up/Sign-in:
curl --request POST \
  --url https://cc6ljnrlvl.execute-api.us-east-1.amazonaws.com/dev/signUp \
  --header 'Content-Type: application/json' \
  --data '{
  "Username": "testMail@gmail.com",
	"Password":"Passw0rd!!!"
}'

curl --request POST \
  --url https://cc6ljnrlvl.execute-api.us-east-1.amazonaws.com/dev/signIn \
  --header 'Content-Type: application/json' \
  --data '{
  "Username": "testMail@gmail.com",
	"Password":"Passw0rd!!!"
}'

# Images action:
curl --request POST \
  --url https://cc6ljnrlvl.execute-api.us-east-1.amazonaws.com/dev/create-presigned-post \
  --header 'Authorization: ID_TOKEN' \
  --data '{
	"ImageName": "TestImage.jpeg",
	"ContentType":"image/jpeg"
}'

curl --request POST \
  --url https://s3.amazonaws.com/uploaded-users-images-bucket \
  --header 'Content-Type: multipart/form-data' \
  --form Key=testMail@gmail.com/TestImage.jpeg \
  --form ContentType=image/jpeg \
  --form bucket=uploaded-users-images-bucket \
  --form X-Amz-Algorithm=AWS4-HMAC-SHA256 \
  --form X-Amz-Credential=X-Amz-Credential \
  --form X-Amz-Date=X-Amz-Date \
  --form 'X-Amz-Security-Token=X-Amz-Security-Token' \
  --form Policy= Policy \
  --form X-Amz-Signature=X-Amz-Signature \
  --form 'file=@Path'

curl --request GET \
  --url https://cc6ljnrlvl.execute-api.us-east-1.amazonaws.com/dev/my-images \
  --header 'Authorization: ID_TOKEN'

curl --request DELETE \
  --url https://cc6ljnrlvl.execute-api.us-east-1.amazonaws.com/dev/delete-image \
  --header 'Authorization: ID_TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
	"ImageName":"TestImage.jpeg"
}'

