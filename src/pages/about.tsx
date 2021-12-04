import * as React from 'react'

import { NextPage } from 'next'

const AboutPage: NextPage = () => {
  return (
    <div className='px-4 py-16 overflow-hidden sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-max lg:max-w-7xl'>
        <div className='relative z-10 mb-8 md:mb-2 md:px-6'>
          <div className='text-base max-w-prose lg:max-w-none'>
            <h2 className='font-semibold leading-6 tracking-wide text-indigo-600 uppercase'>
              curhat
            </h2>
            <p className='mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl'>
              A better way to cope with stress
            </p>
          </div>
        </div>
        <div className='relative'>
          <div className='relative p-6 bg-white'>
            <div className='lg:grid lg:grid-cols-2 lg:gap-6'>
              <div className='prose prose-lg text-gray-500 prose-indigo lg:max-w-none'>
                <p>
                  Ultrices ultricies a in odio consequat egestas rutrum. Ut vitae aliquam in ipsum.
                  Duis nullam placerat cursus risus ultrices nisi, vitae tellus in. Qui non fugiat
                  aut minus aut rerum. Perspiciatis iusto mollitia iste minima soluta id.
                </p>
                <p>
                  Erat pellentesque dictumst ligula porttitor risus eget et eget. Ultricies tellus
                  felis id dignissim eget. Est augue <a href='#'>maecenas</a> risus nulla ultrices
                  congue nunc tortor. Eu leo risus porta integer suspendisse sed sit ligula elit.
                </p>
                <ol role='list'>
                  <li>Integer varius imperdiet sed interdum felis cras in nec nunc.</li>
                  <li>Quam malesuada odio ut sit egestas. Elementum at porta vitae.</li>
                </ol>
                <p>
                  Amet, eu nulla id molestie quis tortor. Auctor erat justo, sed pellentesque
                  scelerisque interdum blandit lectus. Nec viverra amet ac facilisis vestibulum.
                  Vestibulum purus nibh ac ultricies congue.
                </p>
              </div>
              <div className='mt-6 prose prose-lg text-gray-500 prose-indigo lg:mt-0'>
                <p>
                  Erat pellentesque dictumst ligula porttitor risus eget et eget. Ultricies tellus
                  felis id dignissim eget. Est augue maecenas risus nulla ultrices congue nunc
                  tortor.
                </p>
                <p>
                  Eu leo risus porta integer suspendisse sed sit ligula elit. Elit egestas lacinia
                  sagittis pellentesque neque dignissim vulputate sodales. Diam sed mauris felis
                  risus, ultricies mauris netus tincidunt. Mauris sit eu ac tellus nibh non eget sed
                  accumsan. Viverra ac sed venenatis pulvinar elit. Cras diam quis tincidunt lectus.
                  Non mi vitae, scelerisque felis nisi, netus amet nisl.
                </p>
                <p>
                  Eu eu mauris bibendum scelerisque adipiscing et. Justo, elementum consectetur
                  morbi eros, posuere ipsum tortor. Eget cursus massa sed velit feugiat sed ut.
                  Faucibus eros mauris morbi aliquam nullam. Scelerisque elementum sit magna
                  ullamcorper dignissim pretium.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
