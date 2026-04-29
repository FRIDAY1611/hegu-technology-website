'use client';

import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { useProducts } from '@/contexts/ProductsContext';
import ProductCard from '@/components/shared/ProductCard';
import { FadeIn } from '@/components/shared/FadeIn';
import { motion, AnimatePresence } from 'framer-motion';

type SeriesType = 'all' | 'AC' | 'DC' | 'Outdoor' | 'Industrial';

const getPageTexts = (locale: string) => {
  switch (locale) {
    case 'zh':
      return {
        title: '所有产品',
        description: '探索合谷科技的全系列喷雾风扇产品',
        all: '全部',
        acSeries: '交流电',
        dcSeries: '直流电',
        outdoorSeries: '户外',
        industrialSeries: '工业',
        noProducts: '暂无该系列产品'
      };
    case 'es':
      return {
        title: 'Todos los Productos',
        description: 'Explore la gama completa de ventiladores de nebulización de HEGU Technology',
        all: 'Todos',
        acSeries: 'AC',
        dcSeries: 'DC',
        outdoorSeries: 'Exterior',
        industrialSeries: 'Industrial',
        noProducts: 'No hay productos en esta serie'
      };
    case 'fr':
      return {
        title: 'Tous les Produits',
        description: 'Découvrez la gamme complète de ventilateurs à brume de HEGU Technology',
        all: 'Tous',
        acSeries: 'AC',
        dcSeries: 'DC',
        outdoorSeries: 'Extérieur',
        industrialSeries: 'Industriel',
        noProducts: 'Aucun produit dans cette série'
      };
    case 'de':
      return {
        title: 'Alle Produkte',
        description: 'Entdecken Sie das komplette Sortiment an Nebelventilatoren von HEGU Technology',
        all: 'Alle',
        acSeries: 'AC',
        dcSeries: 'DC',
        outdoorSeries: 'Außen',
        industrialSeries: 'Industrie',
        noProducts: 'Keine Produkte in dieser Serie'
      };
    case 'ar':
      return {
        title: 'جميع المنتجات',
        description: 'استكشف المجموعة الكاملة من مراوح الضباب من HEGU Technology',
        all: 'الكل',
        acSeries: 'AC',
        dcSeries: 'DC',
        outdoorSeries: 'خارجي',
        industrialSeries: 'صناعي',
        noProducts: 'لا توجد منتجات في هذه السلسلة'
      };
    default:
      return {
        title: 'All Products',
        description: 'Explore the complete range of HEGU Technology mist fans',
        all: 'All',
        acSeries: 'AC',
        dcSeries: 'DC',
        outdoorSeries: 'Outdoor',
        industrialSeries: 'Industrial',
        noProducts: 'No products in this series'
      };
  }
};

export default function AllProductsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const locale = params.locale as string;
  const texts = getPageTexts(locale);
  const { products: allProducts } = useProducts();

  // 从URL参数获取初始系列，默认为'all'
  const getInitialSeries = (): SeriesType => {
    const series = searchParams.get('series') as SeriesType;
    return series && ['all', 'AC', 'DC', 'Outdoor', 'Industrial'].includes(series) ? series : 'all';
  };
  
  const [activeSeries, setActiveSeries] = useState<SeriesType>(getInitialSeries());

  // 监听URL参数变化
  useEffect(() => {
    const newSeries = getInitialSeries();
    if (newSeries !== activeSeries) {
      setActiveSeries(newSeries);
    }
  }, [searchParams]);

  // 根据选中的系列筛选产品
  const getFilteredProducts = () => {
    if (activeSeries === 'all') {
      return allProducts;
    }
    return allProducts.filter(p => p.series === activeSeries);
  };

  const filteredProducts = getFilteredProducts();

  // 系列标签配置
  const seriesTabs: { value: SeriesType; label: string }[] = [
    { value: 'all', label: texts.all },
    { value: 'AC', label: texts.acSeries },
    { value: 'DC', label: texts.dcSeries },
    { value: 'Outdoor', label: texts.outdoorSeries },
    { value: 'Industrial', label: texts.industrialSeries }
  ];

  const handleSeriesChange = (series: SeriesType) => {
    setActiveSeries(series);
    // 更新URL参数
    if (series === 'all') {
      router.replace(`/${locale}/products`, { scroll: false });
    } else {
      router.replace(`/${locale}/products?series=${series}`, { scroll: false });
    }
  };

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

        {/* 系列导航标签 */}
        <FadeIn delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {seriesTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => handleSeriesChange(tab.value)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeSeries === tab.value
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* 产品展示区域 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSeries}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product, index) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    index={index} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  {texts.noProducts}
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
