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

  const onBlur = (field: keyof FormValues) => (
    e: React.FocusEvent<HTMLInputElement>,
  ) => {
    const isEmpty = !e.target.value.trim().length

    if (isEmpty) {
      dispatch({
        type: 'SET_FIELD_ERROR',
        field,
        error: `${field} is a required field`,
      })
    }
  }

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
          onBlur={onBlur('name')}
        />
        {state.errors && state.errors.name && <div>{state.errors.name}</div>}
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
          onBlur={onBlur('email')}
        />
        {state.errors && state.errors.email && <div>{state.errors.email}</div>}
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
          onBlur={onBlur('password')}
        />
        {state.errors && state.errors.password && (
          <div>{state.errors.password}</div>
        )}
      </div>

      <button type="submit">Submit</button>
    </form>
  )
}

// {
//   values: { name: string, email: string, password: string},
//   errors: { name?: string, email?: string, password?: string}
// }
export type State = {
  values: FormValues
  errors?: Partial<FormValues>
}

// {type: '', field: 'name', value: 'Rodrigo'}
export type Action =
  | {type: 'SET_FIELD_VALUE'; field: string; value: string}
  | {type: 'SET_FIELD_ERROR'; field: string; error: string}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_FIELD_VALUE':
      return {
        ...state,
        values: {
          ...state.values,
          [action.field]: action.value,
        },
      }

    case 'SET_FIELD_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.error,
        },
      }

    default:
      return state
  }
}
