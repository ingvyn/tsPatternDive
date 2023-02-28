enum GENDER {
  MALE = 'male',
  FEMALE = 'female'
}

interface AddressData {
  address: string;
  city: string;
  coordinates: {
    lat: number;
    lng: number;
  }
  postalCode: string;
  state: string;
}

interface CompanyData {
    address: AddressData;
    departmnet: string;
    name: string;
    title: string;
}

interface UserCharacteristicData {
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: GENDER;
  birthDate: string;
}

interface UserContactData {
  email: string;
  phone: string;
  image: string;
  address: AddressData;
  macAddress: string;
  university: string;
  company: CompanyData;
  domain: string;
  ip: string;
}

interface UserAuthData {
  username: string;
  password: string;
  userAgent: string;
}

interface UserFeatureData {
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: {
    color: string;
    type: string;
  }
}

interface UserPaymentData {
  bank: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  }
  ein: string;
  ssn: string;
}

interface UserData extends UserCharacteristicData,
  UserContactData,
  UserAuthData,
  UserFeatureData,
  UserPaymentData {
  id: number;
}

interface UserResponseData {
  users: UserData[];
}

interface UserResponse {
  data: UserResponseData;
}

const axios = require('axios');

const logUsers = async () => {
  try {
    const response: UserResponse = await axios.get('https://dummyjson.com/users');
    const users = response.data.users;
    const userLogs: string[] = users.map((user) => `User ${user.firstName} ${user.lastName} ${user.gender} being live in ${user.address.city} ${user.address.address} and work in ${user.company.name}`);
    console.log(userLogs.join('\n'));
  } catch (e) {
    throw Error('dummyjson.com/users doesn\'t response');
  }
}

logUsers();