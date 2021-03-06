// Uncomment these imports to begin using these cool features!

import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {getJsonSchemaRef, post, requestBody} from '@loopback/rest';
import * as _ from 'lodash';
import {User} from '../models';
import {Credentials, UserRepository} from '../repositories';
import {BcryptHasher} from '../services/hash.password.bcrypt';
import {validateCredentials} from '../services/validator';
import {CredentialsRequestBody} from './specs/user.controller.spec';

// import {inject} from '@loopback/core';


export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @inject('service.hasher')
    public hasher: BcryptHasher,
  ) { }

  @post('/user/signup', {
    responses: {
      '200': {
        description: 'User',
        content: {
          schema: getJsonSchemaRef(User),
        },
      },
    }
  })
  async signup(@requestBody() userData: User) {

    validateCredentials(_.pick(userData, ['email', 'password']));
    // validateCredentials(_.pick(userData, ['email', 'password']));
    // validateCredentials(userData.email, userData.password);

    userData.password = await this.hasher.hashPassword(userData.password);

    const savedUser = await this.userRepository.create(userData);
    savedUser.password = "";
    const dtoUser: User = new User();
    dtoUser.email = savedUser.email;
    dtoUser.firstName = savedUser.firstName;
    dtoUser.lastName = savedUser.lastName;
    // console.log('dtoUser: ', dtoUser);
    // delete savedUser.password;
    // return savedUser;
    return dtoUser;
  }

  @post('/user/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody(CredentialsRequestBody) credentials: Credentials,): Promise<{token: string}> {
    return Promise.resolve({token: '5246532326fsdfdsfg'});
  }
}
