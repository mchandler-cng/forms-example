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
