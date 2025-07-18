
import NewSpecsList from './NewSpecsList'
import  supabase  from '../../utils/supabase/server'

export default async function NewsListServer() {
 const { data, error } = await supabase
  .from('trackingboard')
  .select('*')
  .order('created_at', { ascending: false })
  .range(6, 19)




  if (error) {
    console.error(error)
    return <p>Error loading news.</p>
  }

 const items = data ?? []
console.log('Mapped items:', items)
return <NewSpecsList items={data ?? []} />

}
