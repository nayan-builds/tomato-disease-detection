export const diseases = [
  {
    id: 'early-blight',
    name: 'Early Blight',
    description: 'A fungal disease caused by *Alternaria solani*, appearing as dark brown spots with concentric rings on older leaves, often surrounded by yellowing tissue.',
    recommendation: 'Remove infected leaves, improve air circulation, rotate crops, and apply a fungicide containing chlorothalonil or copper if necessary.',
    source: 'University of Minnesota Extension',
    source_url: 'https://extension.umn.edu/plant-diseases/tomato-leaf-spot-diseases'
  },
  {
    id: 'late-blight',
    name: 'Late Blight',
    description: 'Caused by *Phytophthora infestans*, it produces large, greasy-looking dark spots on leaves, often with a pale green halo and white mold on the undersides in humid conditions.',
    recommendation: 'Destroy infected plants, avoid overhead watering, apply preventative fungicides like chlorothalonil or mancozeb, and practice crop rotation.',
    source: 'Cornell University Integrated Pest Management',
    source_url: 'https://ecommons.cornell.edu/bitstream/handle/1813/44629/late-blight-BRO-NYSIPM.pdf?sequence=2'
  },
  {
    id: 'leaf-miner',
    name: 'Leaf Miner',
    description: 'Insect larvae that tunnel through leaf tissue, leaving winding, white or translucent trails across the surface of the leaf.',
    recommendation: 'Remove and destroy affected leaves, use row covers to protect plants, and consider neem oil or insecticidal soap if infestation is severe.',
    source: 'UC IPM (University of California Agriculture and Natural Resources)',
    source_url: 'https://ipm.ucanr.edu/agriculture/tomato/leafminers/'
  },
  {
    id: 'leaf-mold',
    name: 'Leaf Mold',
    description: 'A fungal disease caused by *Passalora fulva*, presenting as pale green to yellow spots on upper leaf surfaces, with velvety olive-green or gray mold on the undersides.',
    recommendation: 'Increase airflow and reduce humidity in greenhouses, avoid wetting foliage, and apply fungicides like copper or chlorothalonil as needed.',
    source: 'Penn State Extension',
    source_url: 'https://extension.psu.edu/managing-leaf-mold-in-high-tunnels/'
  },
  {
    id: 'mosaic-virus',
    name: 'Mosaic Virus',
    description: 'A viral infection causing mottled, light and dark green patterns on leaves, often with leaf curling or distortion and stunted growth.',
    recommendation: 'Remove infected plants, control aphids and other vectors, and use resistant tomato varieties.',
    source: 'RHS (Royal Horticultural Society)',
    source_url: 'https://www.rhs.org.uk/disease/tomato-viruses'
  },
  {
    id: 'septoria',
    name: 'Septoria',
    description: 'Caused by the fungus *Septoria lycopersici*, it shows up as small, round gray spots with dark borders on lower leaves, which may yellow and drop prematurely.',
    recommendation: 'Remove infected leaves, avoid overhead irrigation, rotate crops, and apply fungicides such as chlorothalonil or copper-based sprays.',
    source: 'University of Illinois Extension',
    source_url: 'https://extension.illinois.edu/plant-problems/septoria-leaf-spot-tomato'
  },
  {
    id: 'spider-mites',
    name: 'Spider Mites',
    description: 'Tiny arachnids that feed on leaf sap, causing speckled yellowing or bronzing of leaves, often with fine webbing on the undersides.',
    recommendation: 'Spray with water to dislodge mites, use insecticidal soap or horticultural oil, and encourage natural predators like ladybugs.',
    source: 'Texas A&M AgriLife Extension',
    source_url: 'https://agrilifeorganic.org/2024/05/20/spider-mites-on-tomato/'
  },
  {
    id: 'yellow-leaf-curl-virus',
    name: 'Yellow Leaf Curl Virus',
    description: 'A viral disease transmitted by whiteflies, causing yellowing and upward curling of leaves, along with stunted plant growth and reduced fruit production.',
    recommendation: 'Remove and destroy infected plants, control whitefly populations with insecticidal soap or yellow sticky traps, and plant resistant varieties.',
    source: 'NC State Extension',
    source_url: 'https://content.ces.ncsu.edu/catalog/series/217/'
  }
];



export function getDiseaseById(id: string) {
    return diseases.find((disease) => disease.id === id) || null;
}
