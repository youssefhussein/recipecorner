import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Minus, Plus, Search, X } from 'lucide-react';
import { useState } from 'react';

// Mock data for existing posts (for mentions)
const existingPosts = [
    { id: 1, title: 'Chocolate Chip Cookies', type: 'recipe' },
    { id: 2, title: 'Vanilla Extract', type: 'product' },
    { id: 3, title: 'Beef Stew', type: 'recipe' },
    { id: 4, title: 'Cast Iron Skillet', type: 'product' },
    { id: 5, title: 'Apple Pie', type: 'recipe' },
];

// Categories for recipes based on ingredients
const recipeCategories = {
    desserts: ['Sugar', 'Flour', 'Butter', 'Eggs', 'Vanilla', 'Chocolate', 'Cream', 'Milk'],
    main_dishes: ['Meat', 'Chicken', 'Fish', 'Rice', 'Pasta', 'Vegetables', 'Onions', 'Garlic'],
    appetizers: ['Cheese', 'Crackers', 'Dips', 'Olives', 'Bread', 'Herbs', 'Tomatoes'],
    beverages: ['Water', 'Juice', 'Tea', 'Coffee', 'Milk', 'Fruits', 'Honey', 'Ice'],
    salads: ['Lettuce', 'Spinach', 'Tomatoes', 'Cucumber', 'Carrots', 'Dressing', 'Nuts'],
};

// Post mention component
function PostMention({ onSelect, currentType }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [showResults, setShowResults] = useState(false);

    const filteredPosts = existingPosts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="relative">
            <Label>Mention Other Posts</Label>
            <div className="relative">
                <Search className="absolute top-2.5 left-2 h-4 w-4 text-gray-500" />
                <Input
                    type="text"
                    placeholder="Search for posts to mention..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowResults(e.target.value.length > 0);
                    }}
                    className="pl-8"
                />
            </div>
            {showResults && (
                <div className="absolute z-10 mt-1 max-h-40 w-full overflow-y-auto rounded-md border bg-white shadow-lg">
                    {filteredPosts.map((post) => (
                        <div
                            key={post.id}
                            className="flex cursor-pointer justify-between p-2 hover:bg-gray-100"
                            onClick={() => {
                                onSelect(post);
                                setShowResults(false);
                                setSearchTerm('');
                            }}
                        >
                            <span>{post.title}</span>
                            <span className="text-sm text-gray-500 capitalize">{post.type}</span>
                        </div>
                    ))}
                    {filteredPosts.length === 0 && <div className="p-2 text-gray-500">No posts found</div>}
                </div>
            )}
        </div>
    );
}

// Recipe Form Component
export default function RecipeForm() {
    const [formData, setFormData] = useState({
        title: '',
        userName: '',
        category: '',
        steps: [''],
        mentionedPosts: [],
        // New fields
        ingredients: [],
        cookingTime: '',
        servings: '',
        difficulty: 'medium',
    });

    const [newIngredient, setNewIngredient] = useState('');
    const availableIngredients = formData.category ? recipeCategories[formData.category] || [] : [];

    const addStep = () => {
        setFormData((prev) => ({
            ...prev,
            steps: [...prev.steps, ''],
        }));
    };

    const removeStep = (index) => {
        setFormData((prev) => ({
            ...prev,
            steps: prev.steps.filter((_, i) => i !== index),
        }));
    };

    const updateStep = (index, value) => {
        setFormData((prev) => ({
            ...prev,
            steps: prev.steps.map((step, i) => (i === index ? value : step)),
        }));
    };

    const addMention = (post) => {
        setFormData((prev) => ({
            ...prev,
            mentionedPosts: [...prev.mentionedPosts, post],
        }));
    };

    const removeMention = (postId) => {
        setFormData((prev) => ({
            ...prev,
            mentionedPosts: prev.mentionedPosts.filter((post) => post.id !== postId),
        }));
    };

    // New functions for ingredient management
    const addIngredient = () => {
        if (newIngredient.trim()) {
            setFormData((prev) => ({
                ...prev,
                ingredients: [...prev.ingredients, newIngredient.trim()],
            }));
            setNewIngredient('');
        }
    };

    const removeIngredient = (index) => {
        setFormData((prev) => ({
            ...prev,
            ingredients: prev.ingredients.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('/api/recipes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to create recipe post');
            }

            const data = await response.json();
            alert('Recipe post created successfully!');
            console.log('Saved recipe:', data);

            // Optional: reset form
            setFormData({
                title: '',
                userName: '',
                category: '',
                steps: [''],
                mentionedPosts: [],
                ingredients: [],
                cookingTime: '',
                servings: '',
                difficulty: 'medium',
            });
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while saving the recipe.');
        }
    };
    return (
        <Card className="mx-auto w-full max-w-2xl">
            <CardHeader>
                <CardTitle>Create Recipe Post</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div>
                        <Label htmlFor="recipe-title">Recipe Title</Label>
                        <Input
                            id="recipe-title"
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                            placeholder="Enter recipe title"
                        />
                    </div>

                    <div>
                        <Label htmlFor="recipe-username">Your Name</Label>
                        <Input
                            id="recipe-username"
                            type="text"
                            value={formData.userName}
                            onChange={(e) => setFormData((prev) => ({ ...prev, userName: e.target.value }))}
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <Label>Recipe Category</Label>
                        <Select value={formData.category} onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}>
                            <SelectTrigger>
                                <SelectValue placeholder="Choose category" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.keys(recipeCategories).map((category) => (
                                    <SelectItem key={category} value={category}>
                                        {category.replace('_', ' ').toUpperCase()}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* New Ingredients Section */}
                    <div>
                        <Label>Recipe Ingredients</Label>
                        <div className="mt-2 flex space-x-2">
                            <Input
                                type="text"
                                placeholder="Add an ingredient"
                                value={newIngredient}
                                onChange={(e) => setNewIngredient(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addIngredient())}
                            />
                            <Button onClick={addIngredient} size="sm" variant="outline">
                                <Plus className="mr-1 h-4 w-4" />
                                Add
                            </Button>
                        </div>

                        {formData.ingredients.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                                {formData.ingredients.map((ingredient, index) => (
                                    <div key={index} className="flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
                                        <span>{ingredient}</span>
                                        <Button
                                            onClick={() => removeIngredient(index)}
                                            size="sm"
                                            variant="ghost"
                                            className="ml-1 h-4 w-4 p-0 hover:bg-transparent"
                                        >
                                            <X className="h-3 w-3" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Recipe Details Row */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        {/* Cooking Time */}
                        <div className="space-y-2">
                            <Label htmlFor="cooking-time">Cooking Time</Label>
                            <Input
                                id="cooking-time"
                                type="text"
                                placeholder="e.g. 30 minutes"
                                value={formData.cookingTime}
                                onChange={(e) => setFormData((prev) => ({ ...prev, cookingTime: e.target.value }))}
                            />
                        </div>

                        {/* Servings */}
                        <div className="space-y-2">
                            <Label htmlFor="servings">Servings</Label>
                            <Input
                                id="servings"
                                type="number"
                                placeholder="e.g. 4"
                                value={formData.servings}
                                onChange={(e) => setFormData((prev) => ({ ...prev, servings: e.target.value }))}
                            />
                        </div>

                        {/* Difficulty */}
                        <div className="space-y-2">
                            <Label htmlFor="difficulty">Difficulty</Label>
                            <Select value={formData.difficulty} onValueChange={(value) => setFormData((prev) => ({ ...prev, difficulty: value }))}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select difficulty" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="easy">Easy</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="hard">Hard</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {formData.category && (
                        <div>
                            <Label>Available Ingredients for {formData.category.replace('_', ' ')}</Label>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {availableIngredients.map((ingredient) => (
                                    <span
                                        key={ingredient}
                                        className="cursor-pointer rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800 hover:bg-gray-200"
                                        onClick={() => {
                                            if (!formData.ingredients.includes(ingredient)) {
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    ingredients: [...prev.ingredients, ingredient],
                                                }));
                                            }
                                        }}
                                    >
                                        {ingredient}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div>
                        <div className="mb-3 flex items-center justify-between">
                            <Label>Recipe Steps</Label>
                            <Button onClick={addStep} size="sm" variant="outline">
                                <Plus className="mr-1 h-4 w-4" />
                                Add Step
                            </Button>
                        </div>
                        <div className="space-y-3">
                            {formData.steps.map((step, index) => (
                                <div key={index} className="flex gap-2">
                                    <div className="flex-1">
                                        <Textarea
                                            value={step}
                                            onChange={(e) => updateStep(index, e.target.value)}
                                            placeholder={`Step ${index + 1}...`}
                                            className="min-h-20"
                                        />
                                    </div>
                                    {formData.steps.length > 1 && (
                                        <Button onClick={() => removeStep(index)} size="sm" variant="outline" className="mt-2">
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <PostMention onSelect={addMention} currentType="recipe" />

                    {formData.mentionedPosts.length > 0 && (
                        <div>
                            <Label>Mentioned Posts</Label>
                            <div className="mt-2 space-y-2">
                                {formData.mentionedPosts.map((post) => (
                                    <div key={post.id} className="flex items-center justify-between rounded bg-gray-50 p-2">
                                        <span>
                                            {post.title} ({post.type})
                                        </span>
                                        <Button onClick={() => removeMention(post.id)} size="sm" variant="ghost">
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <Button onClick={handleSubmit} className="w-full">
                        Submit Recipe
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
