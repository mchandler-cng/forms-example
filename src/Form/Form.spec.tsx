import * as React from 'react'
import {render, fireEvent, wait} from '@testing-library/react'
import * as Yup from 'yup'
import {reducer, Form, Action} from './Form'

describe('reducer', () => {
  test('SET_FIELD_VALUE', () => {
    const state = {
      values: {name: 'Mark', email: 'mark@test.com', password: 'Password1'},
    }
    const action: Action = {
      type: 'SET_FIELD_VALUE',
      field: 'name',
      value: 'Dave',
    }
    expect(reducer(state, action)).toMatchObject({
      values: {name: 'Dave'},
    })
  })

  test('SET_FIELD_ERROR', () => {
    const state = {
      values: {name: 'Mark', email: 'mark@test.com', password: 'Password1'},
    }
    const action: Action = {
      type: 'SET_FIELD_ERROR',
      field: 'name',
      error: '"Dave" is not a valid name',
    }
    expect(reducer(state, action)).toMatchObject({
      errors: {name: '"Dave" is not a valid name'},
    })
  })
})

test('displays the form and handles submit', () => {
  const onSubmit = jest.fn()
  const {getByLabelText, getByText} = render(<Form onSubmit={onSubmit} />)

  // find our elements
  const nameInput = getByLabelText(/name/i)
  const emailInput = getByLabelText(/email/i)
  const passwordInput = getByLabelText(/password/i)
  const submitButton = getByText(/submit/i)

  // update values and submit
  fireEvent.change(nameInput, {target: {value: 'Rodrigo'}})
  fireEvent.change(emailInput, {target: {value: 'rodrigo@cooldude.com'}})
  fireEvent.change(passwordInput, {target: {value: 'Password1'}})
  fireEvent.click(submitButton)

  // test that submitted values are what user typed
  expect(onSubmit).toHaveBeenCalledWith({
    name: 'Rodrigo',
    email: 'rodrigo@cooldude.com',
    password: 'Password1',
  })
})

test('displays provided initial values', () => {
  const initialValues = {
    name: 'Name',
    email: 'Email',
    password: 'Password',
  }
  const {getByLabelText} = render(
    <Form onSubmit={jest.fn()} initialValues={initialValues} />,
  )

  // check that values are what we passed
  expect(getByLabelText(/name/i)).toHaveValue('Name')
  expect(getByLabelText(/email/i)).toHaveValue('Email')
  expect(getByLabelText(/password/i)).toHaveValue('Password')
})

test('displays validation schema errors', async () => {
  const schema = Yup.object({
    name: Yup.string().required('Name is a required'),
    email: Yup.string().required('Email is a required field'),
    password: Yup.string()
      .required('Password is a required field')
      .min(8, 'Password must be at least 8 characters'),
  })

  const {getByLabelText, getByText} = render(
    <Form onSubmit={jest.fn()} validationSchema={schema} />,
  )

  // get our input elements
  const name = getByLabelText(/name/i)
  const email = getByLabelText(/email/i)
  const password = getByLabelText(/password/i)

  // fake a blur event
  fireEvent.blur(name)
  fireEvent.blur(email)
  fireEvent.change(password, {target: {value: 'Pass'}})
  fireEvent.blur(password)

  await wait()

  // assert that we have expected error messages
  getByText(/name.*required/i)
  getByText(/email.*required/i)
  getByText(/password.*must be at least 8/i)
})
