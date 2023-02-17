enum Gender {
  Male = 'male',
  Female = 'female'
}

interface addressData {
  address: string;
  city: string
  coordinates: {
    lat: number;
    lng: number
  }
  postalCode: string;
  state: string
}

interface companyData {
    address: addressData;
    departmnet: string;
    name: string;
    title: string
}

interface userCharacteristicData {
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: Gender;
  birthDate: string;
}

interface userContactData {
  email: string;
  phone: string;
  image: string;
  address: addressData;
  macAddress: string;
  university: string;
  company: companyData
  domain: string;
  ip: string
}

interface userAuthData {
  username: string;
  password: string;
  userAgent: string
}

interface userFeatureData {
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: {
    color: string;
    type: string;
  }
}

interface userPaymentData {
  bank: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string
  }
  ein: string;
  ssn: string
}

interface userData extends userCharacteristicData,
  userContactData,
  userAuthData,
  userFeatureData,
  userPaymentData {
  id: number;
}

interface ResponseData {
};
interface UserResponseData extends ResponseData {
  users: userData[]
};
interface UserResponse {
  data: UserResponseData
}

const axios = require('axios');

const logUsers = async () => {
  try {
    const response: UserResponse = await axios.get('https://dummyjson.com/users');
    const users = response.data.users;
    const userLogs: string[] = users.map((user) => `User ${user.firstName} ${user.lastName} ${user.gender} being live in ${user.address.city} ${user.address.address} and work in ${user.company.name}`);
    console.log(userLogs.join('\n'));
  } catch {
    throw Error('dummyjson.com/users doesn\'t response');
  }
}

logUsers();