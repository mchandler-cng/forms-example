import React, {useState} from 'react'

type FormValues = {
  name: string
  email: string
  password: string
}

type Props = {
  onSubmit: (values: FormValues) => void
}

export const Form = ({onSubmit}: Props) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
          onChange={e => setName(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value=""
          onChange={e => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value=""
          onChange={e => setPassword(e.target.value)}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  )
}
