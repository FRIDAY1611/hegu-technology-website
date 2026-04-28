'use client';

import { useParams } from 'next/navigation';
import { getProductsBySeries } from '@/lib/products';
import ProductCard from '@/components/shared/ProductCard';
import { FadeIn } from '@/components/shared/FadeIn';

export default function DCMistFansPage() {
  const params = useParams();
  const locale = params.locale as string;
  const isZh = locale === 'zh';
  
  const products = getProductsBySeries('DC');

  return (
    <div className="pt-24 lg:pt-32 pb-24 lg:pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {isZh ? '直流电喷雾风扇' : 'DC Mist Fans'}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {isZh ? '节能高效，功能先进' : 'Energy-efficient DC mist fans with advanced features'}
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
