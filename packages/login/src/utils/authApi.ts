/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * OpenCRVS is also distributed under the terms of the Civil Registration
 * & Healthcare Disclaimer located at http://opencrvs.org/license.
 *
 * Copyright (C) The OpenCRVS Authors located at https://github.com/opencrvs/opencrvs-core/blob/master/AUTHORS.
 */
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
// import * as Sentry from '@sentry/react'

export interface ICodeVerifyData {
  nonce: string
  code: string
}
export interface ICountryLogo {
  fileName: string
  file: string
}

export interface ILoginBackground {
  backgroundColor: string
  backgroundImage: string
  imageFit: string
}
export interface IApplicationConfig {
  APPLICATION_NAME: string
  COUNTRY: string
  COUNTRY_LOGO: ICountryLogo
  SENTRY: string
  LOGROCKET: string
  LOGIN_BACKGROUND: ILoginBackground
  USER_NOTIFICATION_DELIVERY_METHOD: string
  INFORMANT_NOTIFICATION_DELIVERY_METHOD: string
}

export interface IApplicationConfigResponse {
  config: IApplicationConfig
}

export interface IAuthenticationData {
  username: string
  password: string
}

export const client = axios.create({
  baseURL: process.env.VITE_AUTH_API_URL
})

export interface IAuthenticateResponse {
  nonce: string
  token?: string
  mobile?: string
  email?: string
}

export enum QUESTION_KEYS {
  BIRTH_TOWN = 'BIRTH_TOWN',
  HIGH_SCHOOL = 'HIGH_SCHOOL',
  MOTHER_NAME = 'MOTHER_NAME',
  FAVORITE_TEACHER = 'FAVORITE_TEACHER',
  FAVORITE_MOVIE = 'FAVORITE_MOVIE',
  FAVORITE_SONG = 'FAVORITE_SONG',
  FAVORITE_FOOD = 'FAVORITE_FOOD',
  FIRST_CHILD_NAME = 'FIRST_CHILD_NAME'
}

export enum NotificationEvent {
  TWO_FACTOR_AUTHENTICATION = 'TWO_FACTOR_AUTHENTICATION',
  PASSWORD_RESET = 'PASSWORD_RESET'
}
export interface ITokenResponse {
  token: string
}

export function request<T>(options: AxiosRequestConfig) {
  const onSuccess = (response: AxiosResponse<T>) => {
    return response.data
  }

  const onError = (error: AxiosError) => {
    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx
    } else {
      // Something else happened while setting up the request
      console.error('Error Message:', error.message)
      // Sentry.captureException(error)
    }

    throw error
  }

  return client(options).then(onSuccess).catch(onError)
}

const getApplicationConfig = () => {
  return request<IApplicationConfigResponse>({
    url: new URL('/publicConfig', process.env.VITE_CONFIG_API_URL).toString(),
    method: 'GET'
  })
}

const authenticate = (data: IAuthenticationData) => {
  return request<IAuthenticateResponse>({
    url: new URL('authenticate', process.env.VITE_AUTH_API_URL).toString(),
    method: 'POST',
    data
  })
}

const resendAuthenticationCode = (
  nonce: string,
  notificationEvent: NotificationEvent,
  retrievalFlow = false
) => {
  return request({
    url: new URL(
      '/resendAuthenticationCode',
      process.env.VITE_AUTH_API_URL
    ).toString(),
    method: 'POST',
    data: { nonce, notificationEvent, retrievalFlow }
  })
}

const verifyCode = (data: ICodeVerifyData): Promise<IAuthenticateResponse> => {
  return request({
    url: new URL('verifyCode', process.env.VITE_AUTH_API_URL).toString(),
    method: 'POST',
    data
  })
}

interface IUserVerifyResponse {
  nonce: string
  securityQuestionKey?: string
}

interface IUserVerificationDetails {
  mobile?: string
  email?: string
  retrieveFlow: string
}

const verifyUser = (
  verificationDetails: IUserVerificationDetails
): Promise<IUserVerifyResponse> => {
  return request({
    url: new URL('verifyUser', process.env.VITE_AUTH_API_URL).toString(),
    method: 'POST',
    data: verificationDetails
  })
}

interface IVerifyNumberResponse {
  nonce: string
  securityQuestionKey: string
}

const verifyNumber = (
  nonce: string,
  code: string
): Promise<IVerifyNumberResponse> => {
  return request({
    url: new URL('verifyNumber', process.env.VITE_AUTH_API_URL).toString(),
    method: 'POST',
    data: { nonce, code }
  })
}

export type IVerifySecurityAnswerResponse = { nonce: string } & (
  | {
      matched: false
      securityQuestionKey: QUESTION_KEYS
    }
  | { matched: true }
)

const verifySecurityAnswer = (
  nonce: string,
  answer: string
): Promise<IVerifySecurityAnswerResponse> => {
  return request({
    url: new URL('verifySecurityAnswer', process.env.VITE_AUTH_API_URL).toString(),
    method: 'POST',
    data: { nonce, answer }
  })
}

const changePassword = (nonce: string, newPassword: string): Promise<void> => {
  return request({
    url: new URL('changePassword', process.env.VITE_AUTH_API_URL).toString(),
    method: 'POST',
    data: { nonce, newPassword }
  })
}

const sendUserName = (nonce: string): Promise<void> => {
  return request({
    url: new URL('sendUserName', process.env.VITE_AUTH_API_URL).toString(),
    method: 'POST',
    data: { nonce }
  })
}

export const authApi = {
  request,
  authenticate,
  verifyCode,
  resendAuthenticationCode,
  verifyNumber,
  verifyUser,
  verifySecurityAnswer,
  changePassword,
  sendUserName,
  getApplicationConfig
}
