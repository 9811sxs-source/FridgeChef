import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ResultsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ data: string }>();
  const data = JSON.parse(params.data);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>What's in your fridge</Text>
      <View style={styles.ingredientsBox}>
        <Text style={styles.ingredientsList}>{data.ingredients.join(', ')}</Text>
      </View>

      <Text style={styles.heading}>Recipe Ideas</Text>
      {data.recipes.map((recipe: { name: string; description: string; ingredients: string[] }, index: number) => (
        <View key={index} style={styles.recipeCard}>
          <Text style={styles.recipeName}>{recipe.name}</Text>
          <Text style={styles.recipeDescription}>{recipe.description}</Text>
          <Text style={styles.recipeIngredientsLabel}>Ingredients needed:</Text>
          {recipe.ingredients.map((item: string, i: number) => (
            <Text key={i} style={styles.recipeIngredient}>• {item}</Text>
          ))}
        </View>
      ))}

      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>← Scan Again</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f7',
  },
  content: {
    padding: 24,
    paddingBottom: 48,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a1a',
    marginTop: 24,
    marginBottom: 12,
  },
  ingredientsBox: {
    backgroundColor: '#e8f5e9',
    borderRadius: 12,
    padding: 16,
  },
  ingredientsList: {
    fontSize: 15,
    color: '#2d6a4f',
    lineHeight: 22,
  },
  recipeCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 6,
  },
  recipeDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  recipeIngredientsLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2d6a4f',
    marginBottom: 6,
  },
  recipeIngredient: {
    fontSize: 14,
    color: '#444',
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#2d6a4f',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});
