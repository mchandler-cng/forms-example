import React, {useReducer} from 'react'

type FormValues = {
  name: string
  email: string
  password: string
}

type Props = {
  onSubmit: (values: FormValues) => void
}

export const Form = ({onSubmit}: Props) => {
  const [state, dispatch] = useReducer(reducer, {
    values: {
      name: '',
      email: '',
      password: '',
    },
  })
  const {name, email, password} = state.values

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        onSubmit({name, password, email})
      }}
    >
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          value=""
          onChange={e =>
            dispatch({
              type: 'SET_FIELD_VALUE',
              field: 'name',
              value: e.target.value,
            })
          }
        />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value=""
          onChange={e =>
            dispatch({
              type: 'SET_FIELD_VALUE',
              field: 'email',
              value: e.target.value,
            })
          }
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value=""
          onChange={e =>
            dispatch({
              type: 'SET_FIELD_VALUE',
              field: 'password',
              value: e.target.value,
            })
          }
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  )
}

// { values: {name: string, email: string, password: string}}
export type State = {
  values: FormValues
}

// {type: '', field: 'name', value: 'Rodrigo'}
export type Action = {type: 'SET_FIELD_VALUE'; field: string; value: string}

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_FIELD_VALUE':
      return {
        ...state,
        values: {
          ...state.values,
          [action.field]: action.value,
        },
      }
    default:
      return state
  }
}
