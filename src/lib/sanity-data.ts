import { client, getLocalizedText } from './sanity'
import { getAllProducts, getProductsBySeries, products as fallbackProducts } from './products'

// Fallback data for company info and contacts
function fallbackCompanyInfo() {
  return {
    name: {
      zh: '合谷科技',
      en: 'HEGU Technology',
      es: 'HEGU Tecnología',
      fr: 'HEGU Technologie',
      de: 'HEGU Technologie',
      ar: 'تكنولوجيا هيغو'
    },
    address: {
      zh: '中国浙江省宁波市',
      en: 'Ningbo, Zhejiang, China',
      es: 'Ningbo, Zhejiang, China',
      fr: 'Ningbo, Zhejiang, Chine',
      de: 'Ningbo, Zhejiang, China',
      ar: 'نينغبو، تشجيانغ، الصين'
    },
    phone: '+86 138-0000-0000',
    email: 'info@hegu-tech.com'
  }
}

function fallbackContacts() {
  return {
    wechat: 'HeguOfficial',
    whatsapp: '+8613800000000',
    youtube: '@HeguTechnology',
    linkedin: 'company/hegu-technology',
    tiktok: '@hegu_tech'
  }
}

// Check if Sanity is configured
function isSanityConfigured() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  return projectId && projectId !== 'hegu-tech' && projectId !== 'your-project-id'
}

// Get products - from Sanity or fallback
export async function getProductsFromSanity(locale: string) {
  if (!isSanityConfigured()) {
    return getAllProducts()
  }

  try {
    const query = `*[_type == "product"] | order(order asc)`
    const sanityProducts = await client.fetch(query)
    
    // Transform Sanity products to our format
    return sanityProducts.map((product: any) => ({
      id: product._id,
      model: product.model,
      series: product.series,
      image: '/product-placeholder.jpg', // Use placeholder for now
      description: {
        zh: getLocalizedText(product.description, 'zh'),
        en: getLocalizedText(product.description, 'en'),
        es: getLocalizedText(product.description, 'es'),
        fr: getLocalizedText(product.description, 'fr'),
        de: getLocalizedText(product.description, 'de'),
        ar: getLocalizedText(product.description, 'ar'),
      },
      specs: product.specs?.map((spec: any) => ({
        label: {
          zh: getLocalizedText(spec.label, 'zh'),
          en: getLocalizedText(spec.label, 'en'),
          es: getLocalizedText(spec.label, 'es'),
          fr: getLocalizedText(spec.label, 'fr'),
          de: getLocalizedText(spec.label, 'de'),
          ar: getLocalizedText(spec.label, 'ar'),
        },
        value: spec.value,
      })) || [],
      features: product.features?.map((feature: any) => ({
        icon: feature.icon,
        title: {
          zh: getLocalizedText(feature.title, 'zh'),
          en: getLocalizedText(feature.title, 'en'),
          es: getLocalizedText(feature.title, 'es'),
          fr: getLocalizedText(feature.title, 'fr'),
          de: getLocalizedText(feature.title, 'de'),
          ar: getLocalizedText(feature.title, 'ar'),
        },
      })) || [],
      packing: product.packing || {
        cartonSize: '',
        pcsCtn: '',
        gw: '',
        nw: '',
        cbm: '',
        container20ft: '',
        container40hq: '',
      },
      isFeatured: product.isFeatured || false,
    }))
  } catch (error) {
    console.error('Error fetching from Sanity, using fallback:', error)
    return getAllProducts()
  }
}

// Get company info
export async function getCompanyInfoFromSanity() {
  if (!isSanityConfigured()) {
    return fallbackCompanyInfo()
  }

  try {
    const query = `*[_type == "companyInfo"][0]`
    const sanityCompany = await client.fetch(query)
    
    if (!sanityCompany) return fallbackCompanyInfo()

    return {
      name: {
        zh: getLocalizedText(sanityCompany.name, 'zh'),
        en: getLocalizedText(sanityCompany.name, 'en'),
        es: getLocalizedText(sanityCompany.name, 'es'),
        fr: getLocalizedText(sanityCompany.name, 'fr'),
        de: getLocalizedText(sanityCompany.name, 'de'),
        ar: getLocalizedText(sanityCompany.name, 'ar'),
      },
      address: {
        zh: getLocalizedText(sanityCompany.address, 'zh'),
        en: getLocalizedText(sanityCompany.address, 'en'),
        es: getLocalizedText(sanityCompany.address, 'es'),
        fr: getLocalizedText(sanityCompany.address, 'fr'),
        de: getLocalizedText(sanityCompany.address, 'de'),
        ar: getLocalizedText(sanityCompany.address, 'ar'),
      },
      phone: sanityCompany.phone || '',
      email: sanityCompany.email || '',
    }
  } catch (error) {
    console.error('Error fetching company info from Sanity, using fallback:', error)
    return fallbackCompanyInfo()
  }
}

// Get contacts
export async function getContactsFromSanity() {
  if (!isSanityConfigured()) {
    return fallbackContacts()
  }

  try {
    const query = `*[_type == "companyInfo"][0]`
    const sanityCompany = await client.fetch(query)
    
    if (!sanityCompany?.contacts) return fallbackContacts()

    return {
      wechat: sanityCompany.contacts.wechat || '',
      whatsapp: sanityCompany.contacts.whatsapp || '',
      youtube: sanityCompany.contacts.youtube || '',
      linkedin: sanityCompany.contacts.linkedin || '',
      tiktok: sanityCompany.contacts.tiktok || '',
    }
  } catch (error) {
    console.error('Error fetching contacts from Sanity, using fallback:', error)
    return fallbackContacts()
  }
}

// Export unified functions that use fallback if Sanity not configured
export { getAllProducts, getProductsBySeries }
