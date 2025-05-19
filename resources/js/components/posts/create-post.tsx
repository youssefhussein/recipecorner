import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import ProductForm from './ProductForm';
import RecipeForm from './RecipeForm';

export default function CreatePostForm() {
    const [postType, setPostType] = useState(null);

    const renderForm = () => {
        if (postType === 'recipe') return <RecipeForm />;
        if (postType === 'product') return <ProductForm />;
        return null;
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <div className="mb-8 text-center">
                    <h1 className="mb-4 text-3xl font-bold text-gray-900">Create a New Post</h1>
                    <p className="text-gray-600">Share your recipes or promote your products with the community</p>
                </div>

                <Card className="mx-auto mb-8 w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-center">Select Post Type</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Select value={postType || ''} onValueChange={setPostType}>
                            <SelectTrigger>
                                <SelectValue placeholder="Choose post type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="recipe">Recipe</SelectItem>
                                <SelectItem value="product">Product</SelectItem>
                            </SelectContent>
                        </Select>
                    </CardContent>
                </Card>

                {renderForm()}
            </div>
        </div>
    );
}
