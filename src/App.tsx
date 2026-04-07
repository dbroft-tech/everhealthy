import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/pages/HomePage';
import { ProductsPage } from './components/pages/ProductsPage';
import { CheckoutPage } from './components/pages/CheckoutPage';
import { ContactPage } from './components/pages/ContactPage';
import { AboutPage } from './components/pages/AboutPage';
import { TestimonialsPage } from './components/pages/TestimonialsPage';
import { BusinessPage } from './components/pages/BusinessPage';
import { Product } from './components/ProductCard';
import { Cart, CartItem } from './components/Cart';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';
import { Currency, getExchangeRate } from './utils/currency';
import { products } from './data/products';

const oldProducts: Product[] = [
  {
    id: '1',
    name: 'Cardamom Tea',
    description: 'Premium cardamom tea blend for enhanced flavor and wellness benefits - 20 sachets',
    price: 30,
    rating: 4.7,
    reviews: 245,
    image: 'https://everhealthyintl.com/assets/images/product/64b691d08f69d1689686480.jpeg',
    category: 'Beverages',
    inStock: true,
  },
  {
    id: '2',
    name: 'Green Tea',
    description: 'Multi-dynamic herbal medicinal tea that speeds up metabolism and balances blood pressure. Reduces inflammations, tumor, lump and fats. Helps in weight loss and serves as an antioxidant that detoxifies from head to toe. Protects liver, heart and lungs while preventing cardiovascular diseases - 60 tablets',
    price: 44,
    rating: 4.6,
    reviews: 312,
    image: 'https://everhealthyintl.com/assets/images/product/644a025d837c51682571869.jpeg',
    category: 'Beverages',
    inStock: true,
  },
  {
    id: '3',
    name: 'Adino Plus Capsules',
    description: 'Ayurvedic supplement for enhanced vitality and energy support - 60 capsules',
    price: 44,
    rating: 4.5,
    reviews: 128,
    image: 'https://everhealthyintl.com/assets/images/product/63ea282dacb201676290093.jpg',
    category: 'Capsules',
    inStock: true,
  },
  {
    id: '4',
    name: 'Art Plus Tonic',
    description: 'Herbal tonic for joint health and mobility support - 500ml',
    price: 46,
    rating: 4.4,
    reviews: 94,
    image: 'https://everhealthyintl.com/assets/images/product/63ea27f4a5cc91676290036.png',
    category: 'Tonics',
    inStock: true,
  },
  {
    id: '5',
    name: 'B-Comfort Capsules',
    description: 'Natural formula for digestive comfort and wellness - 60 capsules',
    price: 44,
    rating: 4.6,
    reviews: 167,
    image: 'https://everhealthyintl.com/assets/images/product/63ea27cf1c29c1676289999.jpg',
    category: 'Capsules',
    inStock: true,
  },
  {
    id: '6',
    name: 'B-Comfort Oil',
    description: 'Soothing topical oil for external application and massage - 25ml',
    price: 24,
    rating: 4.5,
    reviews: 89,
    image: 'https://everhealthyintl.com/assets/images/product/63ea2792a39011676289938.jpg',
    category: 'Oils',
    inStock: true,
  },
  {
    id: '7',
    name: 'Benner 3 Capsules',
    description: 'Ayurvedic formulation for overall health and vitality - 60 capsules',
    price: 44,
    rating: 4.7,
    reviews: 143,
    image: 'https://everhealthyintl.com/assets/images/product/63ea2759b7bb81676289881.png',
    category: 'Capsules',
    inStock: true,
  },
  {
    id: '8',
    name: 'Cabul-500 Capsules',
    description: 'Herbal supplement for metabolic and digestive support - 60 capsules',
    price: 44,
    rating: 4.5,
    reviews: 76,
    image: 'https://everhealthyintl.com/assets/images/product/63ea271900a341676289817.jpg',
    category: 'Capsules',
    inStock: true,
  },
  {
    id: '9',
    name: 'Calcol Juice',
    description: 'Natural juice blend for kidney and urinary tract health - 500ml',
    price: 46,
    rating: 4.6,
    reviews: 112,
    image: 'https://everhealthyintl.com/assets/images/product/63ea26d4d73f71676289748.png',
    category: 'Juices',
    inStock: true,
  },
  {
    id: '10',
    name: 'Cedar Mol Juice',
    description: 'Herbal juice for respiratory and immune system support - 500ml',
    price: 46,
    rating: 4.7,
    reviews: 98,
    image: 'https://everhealthyintl.com/assets/images/product/63ea26a6a6fd81676289702.png',
    category: 'Juices',
    inStock: true,
  },
  {
    id: '11',
    name: 'Check-RX Capsules',
    description: 'Ayurvedic formula for overall wellness and health - 60 capsules',
    price: 44,
    rating: 4.8,
    reviews: 156,
    image: 'https://everhealthyintl.com/assets/images/product/63ea267d641af1676289661.png',
    category: 'Capsules',
    inStock: true,
  },
  {
    id: '12',
    name: 'Nutri-FX Capsules',
    description: 'Natural nutrient formula for body nourishment and vitality - 60 capsules',
    price: 44,
    rating: 4.6,
    reviews: 203,
    image: 'https://everhealthyintl.com/assets/images/product/63ea2655cdb341676289621.jpg',
    category: 'Capsules',
    inStock: true,
  },
  {
    id: '13',
    name: 'Cushvite-3 Juice',
    description: 'Herbal juice blend for vitality and wellness - 500ml',
    price: 46,
    rating: 4.5,
    reviews: 87,
    image: 'https://everhealthyintl.com/assets/images/product/63ea262c50dc61676289580.png',
    category: 'Juices',
    inStock: true,
  },
  {
    id: '14',
    name: 'Dan-Jaan 10 Capsules',
    description: 'Traditional formula for joint health and mobility - 60 capsules',
    price: 44,
    rating: 4.7,
    reviews: 124,
    image: 'https://everhealthyintl.com/assets/images/product/63ea25fd09b8e1676289533.jpg',
    category: 'Capsules',
    inStock: true,
  },
  {
    id: '15',
    name: 'Dura Vine Juice',
    description: 'Natural juice for strength and endurance support - 500ml',
    price: 46,
    rating: 4.6,
    reviews: 145,
    image: 'https://everhealthyintl.com/assets/images/product/63ea25d6c5ed71676289494.jpg',
    category: 'Juices',
    inStock: true,
  },
  {
    id: '16',
    name: 'Dynamic Liv Forte Tablet',
    description: 'Contains all that is needed for liver survival. Shields liver from toxins, stress, and free radicals. Lowers toxic load and prevents any form of hepatitis. Perfect for inflammation of the liver due to antibacterial and anti-inflammatory properties. Reverses damage from harmful chemicals, acetaminophen or paracetamol. Cures liver disorder, reduces bilirubin, cleans and detoxifies liver, improves function, treats fatty liver and induces lipolysis - 30 tablets',
    price: 44,
    rating: 4.8,
    reviews: 189,
    image: 'https://everhealthyintl.com/assets/images/product/63ea2582230f01676289410.png',
    category: 'Tablets',
    inStock: true,
  },
  {
    id: '17',
    name: 'Dynamic Slim Juice',
    description: 'Natural weight management juice blend - 500ml',
    price: 46,
    rating: 4.5,
    reviews: 267,
    image: 'https://everhealthyintl.com/assets/images/product/63ea2551534561676289361.jpg',
    category: 'Juices',
    inStock: true,
  },
  {
    id: '18',
    name: 'Espi Hist Juice',
    description: 'Herbal juice for respiratory wellness and comfort - 500ml',
    price: 46,
    rating: 4.6,
    reviews: 102,
    image: 'https://everhealthyintl.com/assets/images/product/63ea24e4315821676289252.png',
    category: 'Juices',
    inStock: true,
  },
  {
    id: '19',
    name: 'Evertulsi Drop',
    description: 'Holy basil drops for immunity and stress relief - 50ml',
    price: 24,
    rating: 4.7,
    reviews: 178,
    image: 'https://everhealthyintl.com/assets/images/product/63ea24e4315821676289252.png',
    category: 'Drops',
    inStock: true,
  },
  {
    id: '20',
    name: 'Force 4 Capsules',
    description: 'Enhanced strength formula for vitality and wellness - 60 capsules',
    price: 44,
    rating: 4.8,
    reviews: 134,
    image: 'https://everhealthyintl.com/assets/images/product/63ea24ac6e4151676289196.jpg',
    category: 'Capsules',
    inStock: true,
  },
  {
    id: '21',
    name: 'FS-Desire Capsules',
    description: 'Natural formula for enhanced wellness and vitality - 60 capsules',
    price: 44,
    rating: 4.6,
    reviews: 92,
    image: 'https://everhealthyintl.com/assets/images/product/63ea24792b5c31676289145.jpg',
    category: 'Capsules',
    inStock: true,
  },
  {
    id: '22',
    name: 'FS-Desire Oil',
    description: 'Topical oil for external massage and wellness - 25ml',
    price: 24,
    rating: 4.5,
    reviews: 68,
    image: 'https://everhealthyintl.com/assets/images/product/63ea241f3353e1676289055.jpg',
    category: 'Oils',
    inStock: true,
  },
  {
    id: '23',
    name: 'Garry Capsules',
    description: 'Pure garlic extract for cardiovascular and immune support - 60 capsules',
    price: 44,
    rating: 4.7,
    reviews: 234,
    image: 'https://everhealthyintl.com/assets/images/product/63ea23f95942a1676289017.jpg',
    category: 'Capsules',
    inStock: true,
  },
  {
    id: '24',
    name: 'Gourd Juice',
    description: 'Natural bitter gourd juice for metabolic health - 500ml',
    price: 36,
    rating: 4.4,
    reviews: 87,
    image: 'https://everhealthyintl.com/assets/images/product/63ea23d4502f01676288980.jpg',
    category: 'Juices',
    inStock: true,
  },
  {
    id: '25',
    name: 'Ibher Juice',
    description: 'Herbal juice for overall wellness - 500ml',
    price: 46,
    rating: 4.6,
    reviews: 145,
    image: 'https://everhealthyintl.com/assets/images/product/63ea26a6a6fd81676289702.png',
    category: 'Juices',
    inStock: true,
  },
  {
    id: '26',
    name: 'Noni Mix Juice',
    description: 'Premium noni fruit juice blend for health and vitality - 500ml',
    price: 46,
    rating: 4.7,
    reviews: 132,
    image: 'https://everhealthyintl.com/assets/images/product/63ea26d4d73f71676289748.png',
    category: 'Juices',
    inStock: true,
  },
  {
    id: '27',
    name: 'Pain Vile Juice',
    description: 'Specifically designed to give instant reply to pains, provide strength to nerves, and reduce stiffness of joints, neck pain, low back pain, hip pain, neuralgia, and aches. Prevents degeneration of joint cartilage, prevents cell damage, and reduces inflammation of joints. A pain killer for osteoarthritis, sciatica, and lumbago. A muscular relaxant and pain reliever in rheumatism. Reduces migraine, swellings and inflammations. Perfect for epilepsy, hysteria, convulsions, mental weakness, headaches and helps in normal functioning of joints - 500ml',
    price: 46,
    rating: 4.5,
    reviews: 98,
    image: 'https://everhealthyintl.com/assets/images/product/63ea25d6c5ed71676289494.jpg',
    category: 'Juices',
    inStock: true,
  },
  {
    id: '28',
    name: 'Pain Vile Oil',
    description: 'Topical oil for pain relief and massage - 100ml',
    price: 44,
    rating: 4.6,
    reviews: 156,
    image: 'https://everhealthyintl.com/assets/images/product/63ea2792a39011676289938.jpg',
    category: 'Oils',
    inStock: true,
  },
  {
    id: '29',
    name: 'Pros-X Prostate Capsules',
    description: 'Excellent approach to open up urine stream and clear away complications that usually come with prostate disease. Fortified with Gokhru (the devils weed) and Chandra Prabha Bati to deal with multitude of diseases of the kidney, urinary tract, pancreas, and thyroid. Medically known as a disease linked to hormonal changes as a man gets older. Keeping the thyroid hormone healthy is important in maintaining healthy prostate size. Contains 15 extra formulas to stop complications with prostate disease, pains at base of penis, abrupt high fever, chills, joint and muscle aches, and profound fatigue. Contains anti-inflammatory compounds that help protect against cancer and 84 minerals that function as antioxidants - 60 capsules',
    price: 44,
    rating: 4.7,
    reviews: 187,
    image: 'https://everhealthyintl.com/assets/images/product/63ea24ac6e4151676289196.jpg',
    category: 'Capsules',
    inStock: true,
  },
  {
    id: '30',
    name: 'Soft-Lax Capsules',
    description: 'Quick healing ayurvedic remedy with carminative action. Superb for maintenance of healthy digestive system, constipation, hemorrhoids, anal fistula, and irritable bowel syndrome. One of the best medicinal plants in Ayurveda. Gives complete healing on bleeding piles, chronic and acute piles, blinding and dry piles, irregular bowel movements resulting in bleeding piles, pre and post-operative pile. When the anus is pulled, everhealthy soft Lax pulls it back and gives quick healing - 60 capsules',
    price: 44,
    rating: 4.5,
    reviews: 123,
    image: 'https://everhealthyintl.com/assets/images/product/63ea27cf1c29c1676289999.jpg',
    category: 'Capsules',
    inStock: true,
  },
  {
    id: '31',
    name: 'TC Dental Drops',
    description: 'Complete dental doctor, a perfect shift from everyday toothpaste to providing complete solution to your dental challenges. Multi-dynamic TC Dental produced specially with Sapindus Mukorossi is a powerful anti-inflammatory and antimicrobial agent for any form of bacteria. With combination of Syzygium Aromaticum with its astringent properties and as a powerful anthelmintic for destroying any form of parasitic worms on your teeth. Complete prevention from cavities, dental pain, toothache, sore gums, and mouth ulcers. Also takes away the venom of scorpion - 10ml',
    price: 24,
    rating: 4.6,
    reviews: 95,
    image: 'https://everhealthyintl.com/assets/images/product/63ea24e4315821676289252.png',
    category: 'Drops',
    inStock: true,
  },
  {
    id: '32',
    name: 'Utritone Capsules',
    description: 'Nutritional capsules for overall health support - 60 capsules',
    price: 44,
    rating: 4.6,
    reviews: 145,
    image: 'https://everhealthyintl.com/assets/images/product/63ea282dacb201676290093.jpg',
    category: 'Capsules',
    inStock: true,
  },
  {
    id: '33',
    name: 'Variclear Capsules',
    description: 'Natural formula for vascular health support - 60 capsules',
    price: 44,
    rating: 4.7,
    reviews: 112,
    image: 'https://everhealthyintl.com/assets/images/product/63ea267d641af1676289661.png',
    category: 'Capsules',
    inStock: true,
  },
  {
    id: '34',
    name: 'Vile-Q Tablets',
    description: 'Excellent remedy for pains and all forms of arthritis. Treats A to Z cartilage-related disorders. Ensures accelerated healing of fractures, contains Hadjorh and Colchicum. As stated in William Boericke Materia Medica, Colchicum has specific power of relieving gouty paroxysms. More beneficial in chronic affections, swelling, tearing pains, worse in evening and at night and from touch. Shocks as from electricity, pins and needles in hands and wrist, fingertips numb. Brings down uric acid, gout, rheumatism, sciatica, arthritis, spasmodic attacks, and phlegmatic affections. Joint stiffness, swelling and promotes mobility. For migraine, nerve disorder, depression, anxiety, and asthma - 60 tablets',
    price: 44,
    rating: 4.5,
    reviews: 134,
    image: 'https://everhealthyintl.com/assets/images/product/63ea2582230f01676289410.png',
    category: 'Tablets',
    inStock: true,
  },
  {
    id: '35',
    name: 'Vita-PX Tonic',
    description: 'Multifunctional ayurvedic apothecary, bestowing beautiful and calming energy (Virya). The adaptogenic properties help the body and mind withstand stress, slow down, stop and reverse certain types of nerve damage. Treats digestive problems, helps in building body muscles, and also improves body weight, restores physical strength, treats retarded growth, lack of appetite, constipation, general weakness, anorexia, fatigue, malnutrition, low stamina, liver dysfunction, and jaundice. As a natural aphrodisiac, it helps in reducing mental stress and anxiety. Increases vitality, stamina in men and helps to protect against chronic diseases. Increases body Glutathione (GSH) level and supports the liver to detoxify waste from the body - 500ml',
    price: 46,
    rating: 4.8,
    reviews: 178,
    image: 'https://everhealthyintl.com/assets/images/product/63ea27f4a5cc91676290036.png',
    category: 'Tonics',
    inStock: true,
  },
  {
    id: '36',
    name: 'Havitas Tonic',
    description: 'Premium health tonic for overall wellness - 500ml',
    price: 46,
    rating: 4.7,
    reviews: 156,
    image: 'https://everhealthyintl.com/assets/images/product/63ea27f4a5cc91676290036.png',
    category: 'Tonics',
    inStock: true,
  },
  {
    id: '37',
    name: 'Horite Eye Drop',
    description: 'Eye care drops for vision health - 10ml',
    price: 24,
    rating: 4.6,
    reviews: 87,
    image: 'https://everhealthyintl.com/assets/images/product/63ea24e4315821676289252.png',
    category: 'Drops',
    inStock: true,
  },
  {
    id: '38',
    name: 'Pepto Rest Capsules',
    description: 'The end of battle in stomach ulcers. Containing Guduchi - the imperishable heavenly elixir, and in presence of Asparagus Racemosus (Shatavari) as presented in john henry clerk and William Boericke materia medica is the end of stomach upset, dyspepsia, constipation, stomach spasm, taste insipid, eructation, flatulence, frequent emission of wind, fulness of stomach, and sensitive to touch. Prevents and cures mucositis (inflammation and ulceration of mucus membranes lining digestive tract). Usually an adverse effect of chemotherapy and radiotherapy treatment for cancer. Clears away chronic acidity, heartburn, colic pains, hyperacidity, balances acid production in stomach, neutralizes excess acid, reduces inflammation of digestive organs, clear away damages caused by contaminated food, and takes away gas and flatulence due to its carminative property - 60 capsules',
    price: 44,
    rating: 4.7,
    reviews: 142,
    image: 'https://everhealthyintl.com/assets/images/product/63ea27cf1c29c1676289999.jpg',
    category: 'Capsules',
    inStock: true,
  },
  {
    id: '39',
    name: 'Vita Trace Capsules',
    description: 'Double Stemcell+ - An amazing combination of supplements and remedies put together makes our Double Stemcell + a refreshing voice in the wilderness of pathological conditions. Bringing the stemcells of multiple fruits, combined with 16 Ayurvedic remedies that are designed to renew your cells, repair damaged tissues, nerve muscles, neurologic disorder, dementia, reproductive system, respiratory system, circulatory system, and urinary system. In a wholistic approach, everhealthy double stemcell+ touches on every human organ and gets you completely rejuvenated. Our double stemcell+ has anti-inflammatory, antispasmodic, and anti-depressant properties that give us the clinical laurel above any other stemcell you may have come across. Can be used on any form of sickness - 60 capsules',
    price: 44,
    rating: 4.8,
    reviews: 167,
    image: 'https://everhealthyintl.com/assets/images/product/63ea282dacb201676290093.jpg',
    category: 'Capsules',
    inStock: true,
  },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'products' | 'checkout' | 'contact' | 'about' | 'testimonials' | 'business'>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currency, setCurrency] = useState<Currency>('USD');
  const [exchangeRate, setExchangeRate] = useState<number>(3700);

  useEffect(() => {
    getExchangeRate().then(setExchangeRate);
  }, []);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.product.id === product.id);
      if (existingItem) {
        toast.success(`Updated ${product.name} quantity in cart`);
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      toast.success(`Added ${product.name} to cart`);
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    toast.success('Item removed from cart');
  };

  const handleNavigate = (page: 'home' | 'products' | 'checkout' | 'contact' | 'about' | 'testimonials' | 'business') => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white">
      <Header
        cartItemCount={totalItems}
        onCartClick={() => setIsCartOpen(true)}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        currency={currency}
        onCurrencyChange={setCurrency}
        exchangeRate={exchangeRate}
      />

      <Cart
        items={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => handleNavigate('checkout')}
        currency={currency}
        exchangeRate={exchangeRate}
      />

      {currentPage === 'home' && (
        <HomePage
          products={products}
          onAddToCart={handleAddToCart}
          onNavigate={handleNavigate}
          currency={currency}
          exchangeRate={exchangeRate}
        />
      )}

      {currentPage === 'products' && (
        <ProductsPage
          products={products}
          onAddToCart={handleAddToCart}
          currency={currency}
          exchangeRate={exchangeRate}
        />
      )}

      {currentPage === 'checkout' && (
        <CheckoutPage
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          currency={currency}
          exchangeRate={exchangeRate}
        />
      )}

      {currentPage === 'contact' && (
        <ContactPage />
      )}

      {currentPage === 'about' && (
        <AboutPage />
      )}

      {currentPage === 'testimonials' && (
        <TestimonialsPage />
      )}

      {currentPage === 'business' && (
        <BusinessPage onNavigate={handleNavigate} />
      )}

      <Footer onNavigate={handleNavigate} />

      <WhatsAppButton />

      <Toaster position="top-right" />
    </div>
  );
}
