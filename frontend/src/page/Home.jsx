import React, { useState } from 'react';
import { Card, FormField, Loader } from '../components'
const RenderCards = ({ data, title }) => {
  if (data.length > 0) {
  return data.map((item) =>
   <Card key={item.id} {...item} />) }
  return (
    <h2 className='mt-5 font-bold text-[#6449ff] text-xl uppercase'>
      {title}
    </h2>
  )
}

const Home = () => {
  const [loading, setLoading] = useState(false)
  const [allPosts, setAllPosts] = useState(null)
  const [searchText, setSearchText] = useState('')
  return (
    <section className='max-w-7x1 mx-auto'>
      <div>
        <h1 className='text-[32px] font-extrabold text-[#222328]'>The Community Showcase</h1>
        <p className='text-[#7C7C7C] mt-2 text-[16px]'>Browse through a collection of Creative Images </p>
      </div>
      <div className='mt-16'>
        <FormField/>
      </div>
      <div className='mt-10'>
        {loading ? (
          <div className='flex justify-center items-center'>
            <Loader />
          </div>
        ) : (
          <>
          {searchText && (
            <h2 className='font-medium text-[#666e75]  text-xl mb-3'>
              Search Results for
              <span className='text-[#222328]'>
              {searchText}</span>
            </h2>
            )}
            <div className='grid lg:grid-cols-4 sm:grid-cols-3
            xs:grid-cols-2 gird-cols-1 gap-3'>
            {searchText ? (
              <RenderCards
              data={[]}
              title= "No Search results found"/>
            ) : (
              <RenderCards
              data={[]}
              title= "All Posts"/>
            )

       }
            </div>
          </>
        )}

      </div>
      </section>
  )
}
export default Home