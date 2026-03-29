import api from '@/lib/api'

export const fetchMe = () =>
  api.get('/users/me').then(r => r.data)
