import { GiChocolateBar, GiCigarette, GiSnowBottle, GiWaxSeal } from "react-icons/gi";
import { TbPlant2 } from "react-icons/tb";

export const defaultImage = "https://res.cloudinary.com/dggeqtbik/image/upload/v1691279075/ybhipmcoemyemhupmitq.jpg";
export const editMode = "https://i.pinimg.com/originals/4b/8d/ea/4b8dea679e1df0f0985c636e90eeb567.jpg";

export const categoryList = [
  {
    id: 1,
    value: 'weed',
    label: 'Weed',
    icon: TbPlant2,
  },
  {
    id: 2,
    value: 'pre rolls',
    label: 'Pre Rolls',
    icon: GiCigarette,
  },
  {
    id: 3,
    value: 'edibles',
    label: 'Edibles',
    icon: GiChocolateBar,
  },
  {
    id: 4,
    value: 'concentrates',
    label: 'Concentrates',
    icon: GiSnowBottle
  },
  {
    id: 5,
    value: 'wax',
    label: 'Wax',
    icon: GiWaxSeal,
  },
];

export const ratingList = [
  {
    id: 1,
    value: '1',
    label: '1',
  },
  {
    id: 2,
    value: '2',
    label: '2',
  },
  {
    id: 3,
    value: '3',
    label: '3',
  },
  {
    id: 4,
    value: '4',
    label: '4',
  },
  {
    id: 5,
    value: '5',
    label: '5',
  },
];

//Used for add product button
export const addProduct = {
  id:0,
  title: '',
    serviceTime: '',
    deliveryFee: '',
    category: '',
    cuisine: '',
    rating: '',
    price: '',
    coverSrc: '/images/add-icon6.png',
}
export const dataList = [
  {
    id: 1,
    title: 'Acreage Holdings',
    serviceTime: '45-60min',
    deliveryFee: 3.44,
    category: 'weed',
    cuisine: 'american',
    rating: 5,
    price: 2500,
    coverSrc: '/images/places/ameri.jpg',
  },
  {
    id: 2,
    title: 'The Bulldog',
    serviceTime: '15-20min',
    deliveryFee: 4.94,
    category: 'concentrates',
    cuisine: 'italian',
    rating: 4,
    price: 1000,
    coverSrc: '/images/places/italian.webp',
  },
  {
    id: 3,
    title: 'Cannabis Culture',
    serviceTime: '30-22min',
    deliveryFee: 4.94,
    category: 'pre rolls',
    cuisine: 'chinese',
    rating: 3,
    price: 2000,
    coverSrc: '/images/places/china.jpg',
  },
  {
    id: 4,
    title: 'CanniMed',
    serviceTime: '10-18min',
    deliveryFee: 2.14,
    category: 'weed',
    cuisine: 'american',
    rating: 1,
    price: 1800,
    coverSrc: '/images/places/sea.jpg',
  },
  {
    id: 5,
    title: 'Cresco Labs',
    serviceTime: '25-30min',
    deliveryFee: 6.79,
    category: 'concentrates',
    cuisine: 'italian',
    rating: 5,
    price: 2000,
    coverSrc: '/images/places/italiian.jpg',
  },
  {
    id: 6,
    title: 'DrugWarRant',
    serviceTime: '5-15min',
    deliveryFee: 2.87,
    category: 'weed',
    cuisine: 'chinese',
    rating: 5,
    price: 3500,
    coverSrc: '/images/places/fookyew2.jpg',
  },
  {
    id: 7,
    title: 'Checkpoint coffeeshop',
    serviceTime: '50-65min',
    deliveryFee: 8.5,
    category: 'pre rolls',
    cuisine: 'american',
    rating: 2,
    price: 2200,
    coverSrc: '/images/dishes/nacho-burger.jpg',
  },
  {
    id: 8,
    title: 'Mushroom Risotto',
    serviceTime: '10-15min',
    deliveryFee: 1.8,
    category: 'pre rolls',
    cuisine: 'italian',
    rating: 1,
    price: 1900,
    coverSrc: '/images/dishes/Mushroom-Risotto-Recipe-1-1200.jpg',
  },
  {
    id: 9,
    title: 'Cannabis City',
    serviceTime: '12-18min',
    deliveryFee: 3.33,
    category: 'concentrates',
    cuisine: 'chinese',
    rating: 4,
    price: 2750,
    coverSrc: '/images/dishes/shiitake-salmon-fried-rice-0218-103230720.jpg',
  },
  {
    id: 10,
    title: 'Canopy Growth',
    serviceTime: '30-38min',
    deliveryFee: 1.9,
    category: 'pre rolls',
    cuisine: 'american',
    rating: 2,
    price: 4350,
    coverSrc: '/images/dishes/pesto-chicken.jpg',
  },
  {
    id: 11,
    title: 'Aphria',
    serviceTime: '16-20min',
    deliveryFee: 4.1,
    category: 'edibles',
    cuisine: 'italian',
    rating: 3,
    price: 3300,
    coverSrc: '/images/dishes/as-tomato-bruschetta-articleLarge.jpg',
  },
  {
    id: 12,
    title: 'Aurora Cannabis',
    serviceTime: '24-30min',
    deliveryFee: 1.5,
    category: 'edibles',
    cuisine: 'chinese',
    rating: 2,
    price: 4100,
    coverSrc: '/images/dishes/dimsums.jpg',
  },
];


export const questions = [
  {
    id: 1,
    question: 'Is it possible for additional?',
    answer:'Sure can. where are u come form'
  },
  {
    id: 2,
    question: 'Does this product come with any',
    answer:'It comes with global'
  },
  {
    id: 3,
    question: 'lautjh qiweoq qowieiq qiwei ',
    answer:'kwjkelwk kwejklj lkwlejr wwef wew werwe'
  },
  {
    id: 4,
    question: 'How would your best friend describe you?',
    answer:'In your opinion, what is your biggest contribution to your previous organisation and why?'
  },
  {
    id: 5,
    question: 'Tell us about one misconception that people have about you.',
    answer:'Tell us about a time when you made a mistake. How did you resolve it?'
  },
  {
    id: 6,
    question: 'What gives you the most energy at work?',
    answer:'If you are required to learn a new skill, how do you approach the learning process?'
  },
  {
    id: 7,
    question: 'What is your five-year goal?',
    answer:'How would you pitch an idea to a senior employee?'
  },
  {
    id: 8,
    question: 'Tell us about yourself.',
    answer:'How do you handle criticism from your peers or a superior?'
  },
  {
    id: 9,
    question: 'What are your strengths?',
    answer:'Tell us about a time when you had to face conflict at work. How did you handle it?'
  },
  {
    id: 10,
    question: 'What do you do in your spare time?',
    answer:'If you could go back and change one thing in your career, what would it be?'
  },
  {
    id: 11,
    question: 'What is your weakness that can be a strength?',
    answer:'How do you handle pressure at work?'
  },
  {
    id: 12,
    question: 'How did you prepare for this interview?',
    answer:'How do you set professional goals and analyse your performance?'
  },
]