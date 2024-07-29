import * as z from "zod";

//#region Store Setting

const HomeSettingSchema = z.object({
  headerText: z.string().default(""),
  phoneNumber: z.string().default(""),
  headerLogoImage: z.string().default(""),
  categories: z.string().default(""),
  aboutUs: z.string().default(""),
  contactUs: z.string().default(""),
  offers: z.string().default(""),
  faq: z.string().default(""),
  privacyPolicy: z.string().default(""),
  termsAndConditions: z.string().default(""),
  pages: z.string().default(""),
  myAccount: z.string().default(""),
  login: z.string().default(""),
  logout: z.string().default(""),
  checkout: z.string().default(""),
  sliderHero: z
    .array(
      z.object({
        sliderImages: z.string().default(""),
        sliderTitle: z.string().default(""),
        sliderDescription: z.string().default(""),
        sliderButtonName: z.string().default(""),
        sliderButtonLink: z.string().default(""),
      })
    )
    .default([]),
  superDiscountCouponIsActive: z.string().default(""),
  superDiscountCouponsCode: z.array(z.string().default("")).default([]),
  superDiscountTitle: z.string().default(""),

  promotionBannerIsActive: z.string().default(""),
  promotionBannerTitle: z.string().default(""),
  promotionBannerDescription: z.string().default(""),
  promotionBannerButtonName: z.string().default(""),
  promotionBannerButtonLink: z.string().default(""),

  popularProductsIsActive: z.string().default(""),
  popularProductsDiscriotion: z.string().default(""),
  popularProductsTitle: z.string().default(""),
  popularProductsProductsLimit: z.string().default(""),

  quickDeliveryIsActive: z.string().default(""),
  quickDeliverySectionSubTitle: z.string().default(""),
  quickDeliverySectionTitle: z.string().default(""),
  quickDeliverySectionDescription: z.string().default(""),
  quickDeliverySectionButtonName: z.string().default(""),
  quickDeliverySectionButtonLink: z.string().default(""),
  quickDeliverySectionImage: z.string().default(""),

  latestDiscountedProductsIsActive: z.string().default(""),
  latestDiscountedProductsTitle: z.string().default(""),
  latestDiscountedProductsDescription: z.string().default(""),
  latestDiscountedProductsLimit: z.string().default(""),

  getYourDailyNeedsIsActive: z.string().default(""),
  getYourDailyNeedsTitle: z.string().default(""),
  getYourDailyNeedsDescription: z.string().default(""),
  getYourDailyNeedsTitleImageLeft: z.string().default(""),
  getYourDailyNeedsTitleImageRight: z.string().default(""),
  getYourDailyNeedsTitleButton1Image: z.string().default(""),
  getYourDailyNeedsTitleButton1Link: z.string().default(""),
  getYourDailyNeedsTitleButton2Image: z.string().default(""),
  getYourDailyNeedsTitleButton2Link: z.string().default(""),

  featurePromoIsActive: z.string().default(""),
  featurePromoSectionFreeShipping: z.string().default(""),
  featurePromoSectionSupport: z.string().default(""),
  featurePromoSectionSecurePayment: z.string().default(""),
  featurePromoSectionLatestOffer: z.string().default(""),

  footerBlocks: z
    .array(
      z.object({
        active: z.string().default(""),
        title: z.string().default(""),
        link1: z.string().default(""),
        link2: z.string().default(""),
        link3: z.string().default(""),
        link4: z.string().default(""),
      })
    )
    .default([]),
  footerBlock: z.object({
    active: z.string().default(""),
    footerLogo: z.string().default(""),
    address: z.string().default(""),
    phone: z.string().default(""),
    email: z.string().default(""),
    socialLinks: z.object({
      active: z.string().default(""),
      facebook: z.string().default(""),
      twitter: z.string().default(""),
      pinterest: z.string().default(""),
      linkedin: z.string().default(""),
      whatsApp: z.string().default(""),
    }),
  }),
  paymentMethodActive: z.string().default(""),
  paymentMethodImage: z.string().default(""),
  footerBottomContactActive: z.string().default(""),
  footerBottomContactNumber: z.string().default(""),
});

const About_us_schema = z.object({
  pageHeader: z.object({
    enable: z.boolean().optional(),
    pageHeaderBackground: z.string().optional(),
    pageTitle: z.string().optional(),
  }),

  aboutPage: z.object({
    enable: z.boolean().optional(),
    topTitle: z.string().optional(),
    topDescription: z.string().optional(),
    boxOneTitle: z.string().optional(),
    boxOneSubtitle: z.string().optional(),
    boxOneDescription: z.string().optional(),
    boxTwoTitle: z.string().optional(),
    boxTwoSubtitle: z.string().optional(),
    boxTwoDescription: z.string().optional(),
  }),

  pageTopContentRight: z.object({
    enable: z.boolean().optional(),
    topContentRightImage: z.string().optional(),
  }),

  contentSection: z.object({
    enable: z.boolean().optional(),
    firstParagraph: z.string().optional(),
    secondParagraph: z.string().optional(),
    contentImage: z.string().optional(),
  }),

  ourTeam: z.object({
    enableThisBlock: z.boolean().optional(),
    ourTeamTitle: z.string().optional(),
    ourTeamDescription: z.string().optional(),
    member: z.array(
      z.object({
        ourTeamOneImage: z.string().optional(),
        ourTeamOneTitle: z.string().optional(),
        ourTeamOneSubTitle: z.string().optional(),
      })
    ),
  }),
});

const faqs_schema = z.object({
  pageHeader: z.object({
    enable: z.string().optional(),
    pageHeaderBackground: z.string().optional(),
    pageTitle: z.string().optional(),
  }),

  leftColumn: z.object({
    enable: z.string().optional(),
    leftImage: z.string().optional(),
  }),

  faqs: z.object({
    enable: z.string().optional(),
    faq: z.array(
      z.object({
        faqTitle: z.string().optional(),
        faqDescription: z.string().optional(),
      })
    ),
  }),
});

const contact_us_schema = z.object({
  pageHeader: z.object({
    enable: z.string().optional(),
    backgroundImage: z.string().optional(),
    pageTitle: z.string().optional(),
  }),

  emailUsBox: z.object({
    enable: z.string().optional(),
    title: z.string().optional(),
    email: z.string().email().optional(),
    text: z.string().optional(),
  }),

  callUsBox: z.object({
    enable: z.string().optional(),
    title: z.string().optional(),
    phone: z.string().optional(), // Consider using z.string().regex(...) for phone number validation
    text: z.string().optional(),
  }),

  addressBox: z.object({
    enable: z.string().optional(),
    title: z.string().optional(),
    address: z.string().optional(),
  }),

  middleLeftColumn: z.object({
    enable: z.string().optional(),
    middleLeftImage: z.string().optional(),
  }),

  contactForm: z.object({
    enable: z.string().optional(),
    contactFormTitle: z.string().optional(),
    contactFormDescription: z.string().optional(),
  }),
});

const checkout_schema = z.object({
  personalDetails: z.object({
    personalDetails: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    emailAddress: z.string().email().optional(),
    phone: z.string().optional(),
  }),

  shippingDetails: z.object({
    shippingDetails: z.string().optional(),
    streetAddress: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    zipPostal: z.string().optional(),
    shippingCost: z.number().optional(),
    shippingOneName: z.string().optional(),
    shippingOneDescription: z.string().optional(),
    shippingOneCost: z.number().optional(),
    shippingTwoName: z.string().optional(),
    shippingTwoDescription: z.string().optional(),
    shippingTwoCost: z.number().optional(),
    paymentMethod: z.string().optional(),
    continueButton: z.string().optional(),
    confirmButton: z.string().optional(),
  }),

  cartItemSection: z.object({
    orderSummary: z.string().optional(),
    applyButton: z.string().optional(),
    subTotal: z.number().optional(),
    discount: z.number().optional(),
    totalCost: z.number().optional(),
  }),
});

const SEO_schema = z.object({
  faviconIcon: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaUrl: z.string().url().optional(),
  metaKeywords: z.string().optional(),
});

const Privacy_TC_schema = z.object({
  privacyPolicy: z.object({
    enable: z.string().optional(),
    background: z.string().optional(), 
    title: z.string().optional(), 
    pageContent: z.string().optional(), 
  }),

  termsAndConditions: z.object({
    enable: z.string().optional(),
    background: z.string().optional(), 
    title: z.string().optional(), 
    pageContent: z.string().optional(), 
  }),
});

export {
  HomeSettingSchema,
  About_us_schema,
  faqs_schema,
  contact_us_schema,
  checkout_schema,
  SEO_schema,
  Privacy_TC_schema
};

//#endregion
