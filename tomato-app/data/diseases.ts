export const diseases = [
    { id: 'early-blight', name: 'Early Blight', description: 'A fungal disease caused by Alternaria solani...' },
    { id: 'late-blight', name: 'Late Blight', description: 'A serious disease caused by Phytophthora infestans...' },
    { id: 'septoria-leaf-spot', name: 'Septoria Leaf Spot', description: 'A fungal disease that causes leaf spots and defoliation...' },
];

export function getDiseaseById(id: string) {
    return diseases.find((disease) => disease.id === id) || null;
}
