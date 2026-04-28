'use client';

import { useParams } from 'next/navigation';
import { getProductsBySeries } from '@/lib/products';
import ProductCard from '@/components/shared/ProductCard';
import { FadeIn } from '@/components/shared/FadeIn';

export default function ACMistFansPage() {
  const params = useParams();
  const locale = params.locale as string;
  const isZh = locale === 'zh';
  
  const products = getProductsBySeries('AC');

  return (
    <div className="pt-24 lg:pt-32 pb-24 lg:pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {isZh ? '交流电喷雾风扇' : 'AC Mist Fans'}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {isZh ? '可靠的室内冷却应用' : 'Reliable AC mist fans for indoor cooling applications'}
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
