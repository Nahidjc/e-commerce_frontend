import React from 'react'
import styled from 'styled-components'
import PageHero from './PageHero'
import ProductList from './ProductList'
const AllProducts = () => {
    return (
        <main>
            <PageHero title='products' />
            <Wrapper className='page'>
                <div className='section-center '>
                    <div className='row'>
                        <div className="col-md-2">
                        </div>
                        <div className="col-md-10">
                            <ProductList />
                        </div>

                    </div>
                </div>
            </Wrapper>
        </main>
    )
}

const Wrapper = styled.div`
  .products {
    display: grid;
    gap: 3rem 1.5rem;
    margin: 4rem auto;
  }
  @media (min-width: 768px) {
    .products {
      grid-template-columns: 200px 1fr;
    }
  }
`

export default AllProducts