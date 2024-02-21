class SignupModel {
  constructor(
    fullname,
    email,
    cin,
    living_address,
    phoneNumber,
    password,
    account_type,
    isPhoneVerified,
    isEmailVerified,
    avatar,
    uploaded_docs,
    price_of_responder
  ) {
    this.fullname = fullname;
    this.email = email;
    this.cin = cin;
    this.living_address = living_address;
    this.phoneNumber = phoneNumber;
    this.password = password;
    this.account_type = account_type;
    this.isPhoneVerified = isPhoneVerified;
    this.isEmailVerified = isEmailVerified;
    this.avatar = avatar;
    this.uploaded_docs = uploaded_docs;
    this.price_of_responder = price_of_responder;
  }
}

export default SignupModel;
