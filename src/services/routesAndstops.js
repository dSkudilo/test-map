import baseAxios from '@/plugins/axios'

export async function sendReq () {
  const res = await baseAxios.get('public/v1/routes_data?key=012345678abc')
  return res
}
