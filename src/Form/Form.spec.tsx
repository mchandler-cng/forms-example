import * as React from 'react'
import {render, fireEvent} from '@testing-library/react'
import {Form} from './Form'

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
