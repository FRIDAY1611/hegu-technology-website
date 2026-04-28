'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/products';
import { FadeIn } from './FadeIn';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const params = useParams();
  const locale = params.locale as string;
  const isZh = locale === 'zh';

  const title = product.title[locale as 'en' | 'zh'];
  const description = product.description[locale as 'en' | 'zh'];

  return (
    <FadeIn delay={index * 0.1}>
      <Link href={`/${locale}/products/${product.id}`}>
        <motion.div
          whileHover={{ y: -8 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <Card className="overflow-hidden h-full bg-card hover:shadow-xl transition-shadow duration-300">
            <div className="aspect-[4/3] bg-muted relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-muted-foreground/10 flex items-center justify-center">
                    <svg className="w-8 h-8 text-muted-foreground/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-xs text-muted-foreground/40 font-medium">{product.model}</p>
                </div>
              </div>
              <div className="absolute top-3 right-3">
                <span className="px-2.5 py-1 text-xs font-medium bg-background/80 backdrop-blur-sm rounded-full text-muted-foreground">
                  {product.model}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {product.model}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs px-2 py-1 bg-muted rounded-md text-muted-foreground">
                  {product.specs.wattage}
                </span>
                <span className="text-xs px-2 py-1 bg-muted rounded-md text-muted-foreground">
                  {product.specs.waterCapacity}
                </span>
              </div>
              
              <Button variant="default" className="w-full rounded-full">
                {isZh ? '查看详情' : 'View Details'}
              </Button>
            </div>
          </Card>
        </motion.div>
      </Link>
    </FadeIn>
  );
};

export default ProductCard;
