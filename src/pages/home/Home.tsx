import Hero from '../../components/home/Hero/Hero'
import Categories from '../../components/home/Categories/Categories'
import FeaturedProducts from '../../components/home/FeaturedProducts/FeaturedProducts'
import Features from '../../components/home/Features/Features'
import Newsletter from '../../components/home/Newsletter/Newsletter'
import SEO from '../../components/seo/SEO'


function Home() {
  return (
    <main>
      <SEO title="Home"
        description="Discover featured products at ShopEase."
      />
      <Hero />
      <FeaturedProducts />
      <Categories />
      <Features />
      <Newsletter />
    </main>
  )
}

export default Home
