import * as React from 'react'
import {render, fireEvent} from '@testing-library/react'
import {reducer, Form, State, Action} from './Form'

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

test('displays required field errors', () => {
  const {getByLabelText, getByText} = render(<Form onSubmit={jest.fn()} />)

  // get our input elements
  const name = getByLabelText(/name/i)
  const email = getByLabelText(/email/i)
  const password = getByLabelText(/password/i)

  // fake a blur event
  fireEvent.blur(name)
  fireEvent.blur(email)
  fireEvent.blur(password)

  // assert that we have expected error messages
  getByText(/name.*required/i)
  getByText(/email.*required/i)
  getByText(/password.*required/i)
})
