'use client';

import { useParams } from 'next/navigation';
import { getAllProducts } from '@/lib/products';
import ProductCard from '@/components/shared/ProductCard';
import { FadeIn } from '@/components/shared/FadeIn';

const getPageTexts = (locale: string) => {
  switch (locale) {
    case 'zh':
      return {
        title: '所有产品',
        description: '探索合谷科技的全系列喷雾风扇产品',
        acSeries: '交流电喷雾风扇',
        dcSeries: '直流电喷雾风扇',
        outdoorSeries: '户外喷雾风扇',
        industrialSeries: '工业风扇'
      };
    case 'es':
      return {
        title: 'Todos los Productos',
        description: 'Explore la gama completa de ventiladores de nebulización de HEGU Technology',
        acSeries: 'Ventiladores de Nebulización AC',
        dcSeries: 'Ventiladores de Nebulización DC',
        outdoorSeries: 'Ventiladores de Nebulización Exteriores',
        industrialSeries: 'Ventiladores Industriales'
      };
    case 'fr':
      return {
        title: 'Tous les Produits',
        description: 'Découvrez la gamme complète de ventilateurs à brume de HEGU Technology',
        acSeries: 'Ventilateurs à Brume AC',
        dcSeries: 'Ventilateurs à Brume DC',
        outdoorSeries: 'Ventilateurs à Brume Extérieurs',
        industrialSeries: 'Ventilateurs Industriels'
      };
    case 'de':
      return {
        title: 'Alle Produkte',
        description: 'Entdecken Sie das komplette Sortiment an Nebelventilatoren von HEGU Technology',
        acSeries: 'AC-Nebelventilatoren',
        dcSeries: 'DC-Nebelventilatoren',
        outdoorSeries: 'Außen-Nebelventilatoren',
        industrialSeries: 'Industrieventilatoren'
      };
    case 'ar':
      return {
        title: 'جميع المنتجات',
        description: 'استكشف المجموعة الكاملة من مراوح الضباب من HEGU Technology',
        acSeries: 'مراوح ضباب AC',
        dcSeries: 'مراوح ضباب DC',
        outdoorSeries: 'مراوح ضباب خارجية',
        industrialSeries: 'مراوح صناعية'
      };
    default:
      return {
        title: 'All Products',
        description: 'Explore the complete range of HEGU Technology mist fans',
        acSeries: 'AC Mist Fans',
        dcSeries: 'DC Mist Fans',
        outdoorSeries: 'Outdoor Mist Fans',
        industrialSeries: 'Industrial Fans'
      };
  }
};

export default function AllProductsPage() {
  const params = useParams();
  const locale = params.locale as string;
  const texts = getPageTexts(locale);
  const allProducts = getAllProducts();

  // 按系列分组产品
  const acProducts = allProducts.filter(p => p.series === 'AC');
  const dcProducts = allProducts.filter(p => p.series === 'DC');
  const outdoorProducts = allProducts.filter(p => p.series === 'Outdoor');
  const industrialProducts = allProducts.filter(p => p.series === 'Industrial');

  return (
    <div className="pt-24 lg:pt-32 pb-24 lg:pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {texts.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {texts.description}
            </p>
          </div>
        </FadeIn>

        {/* AC Series */}
        {acProducts.length > 0 && (
          <section className="mb-20">
            <FadeIn>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">
                {texts.acSeries}
              </h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {acProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </section>
        )}

        {/* DC Series */}
        {dcProducts.length > 0 && (
          <section className="mb-20">
            <FadeIn delay={0.1}>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">
                {texts.dcSeries}
              </h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {dcProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </section>
        )}

        {/* Outdoor Series */}
        {outdoorProducts.length > 0 && (
          <section className="mb-20">
            <FadeIn delay={0.2}>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">
                {texts.outdoorSeries}
              </h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {outdoorProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </section>
        )}

        {/* Industrial Series */}
        {industrialProducts.length > 0 && (
          <section>
            <FadeIn delay={0.3}>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">
                {texts.industrialSeries}
              </h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {industrialProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
