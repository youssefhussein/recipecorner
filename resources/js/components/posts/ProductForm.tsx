import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Minus, Plus, Search } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

// Mock data for existing posts (for mentions)
const existingPosts = [
  { id: 1, title: "Chocolate Chip Cookies", type: "recipe" },
  { id: 2, title: "Vanilla Extract", type: "product" },
  { id: 3, title: "Beef Stew", type: "recipe" },
  { id: 4, title: "Cast Iron Skillet", type: "product" },
  { id: 5, title: "Apple Pie", type: "recipe" },
];

// Categories for products with subcategories
const productCategories = {
  'Kitchen Tools': ['Knives', 'Cutting Boards', 'Measuring Cups', 'Measuring Spoons', 'Graters', 'Peelers'],
  'Cookware': ['Pans', 'Pots', 'Dutch Ovens', 'Woks', 'Baking Sheets', 'Cast Iron'],
  'Appliances': ['Blenders', 'Food Processors', 'Stand Mixers', 'Slow Cookers', 'Pressure Cookers', 'Toasters'],
  'Bakeware': ['Cake Pans', 'Muffin Tins', 'Pie Dishes', 'Baking Molds', 'Rolling Pins', 'Pastry Bags'],
  'Ingredients': ['Spices', 'Herbs', 'Oils', 'Vinegars', 'Flours', 'Sugars', 'Extracts'],
  'Storage': ['Food Containers', 'Jars', 'Vacuum Sealers', 'Freezer Bags', 'Canisters']
};

// Common cooking techniques that products can be used for
const cookingTechniques = [
  'Baking', 'Grilling', 'Sautéing', 'Roasting', 'Steaming', 
  'Frying', 'Broiling', 'Poaching', 'Simmering', 'Boiling'
];

// Post mention component
function PostMention({ onSelect, currentType }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  
  const filteredPosts = existingPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <Label>Mention Recipes This Product Works With</Label>
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          type="text"
          placeholder="Search for recipes to mention..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowResults(e.target.value.length > 0);
          }}
          className="pl-8"
        />
      </div>
      {showResults && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-40 overflow-y-auto">
          {filteredPosts.filter(post => post.type === "recipe").map(post => (
            <div
              key={post.id}
              className="p-2 hover:bg-gray-100 cursor-pointer flex justify-between"
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
          {filteredPosts.filter(post => post.type === "recipe").length === 0 && (
            <div className="p-2 text-gray-500">No recipes found</div>
          )}
        </div>
      )}
    </div>
  );
}

// Product Form Component
export default function ProductForm() {
  const [formData, setFormData] = useState({
    productName: '',
    userName: '',
    category: '',
    subcategory: '',
    price: '',
    description: '',
    usageTips: '',
    techniques: [],
    alternatives: [],
    mentionedPosts: []
  });

  const availableSubcategories = formData.category ? productCategories[formData.category] || [] : [];
  const [newAlternative, setNewAlternative] = useState('');

  const addMention = (post) => {
    setFormData(prev => ({
      ...prev,
      mentionedPosts: [...prev.mentionedPosts, post]
    }));
  };

  const removeMention = (postId) => {
    setFormData(prev => ({
      ...prev,
      mentionedPosts: prev.mentionedPosts.filter(post => post.id !== postId)
    }));
  };

  const toggleTechnique = (technique) => {
    setFormData(prev => {
      if (prev.techniques.includes(technique)) {
        return {
          ...prev,
          techniques: prev.techniques.filter(t => t !== technique)
        };
      } else {
        return {
          ...prev,
          techniques: [...prev.techniques, technique]
        };
      }
    });
  };

  const addAlternative = () => {
    if (newAlternative.trim()) {
      setFormData(prev => ({
        ...prev,
        alternatives: [...prev.alternatives, newAlternative.trim()]
      }));
      setNewAlternative('');
    }
  };

  const removeAlternative = (index) => {
    setFormData(prev => ({
      ...prev,
      alternatives: prev.alternatives.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = () => {
    console.log('Product submitted:', formData);
    alert('Product post created successfully!');
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Culinary Product Post</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <Label htmlFor="product-name">Product Name</Label>
            <Input
              id="product-name"
              type="text"
              value={formData.productName}
              onChange={(e) => setFormData(prev => ({ ...prev, productName: e.target.value }))}
              placeholder="Enter product name"
            />
          </div>

          <div>
            <Label htmlFor="product-username">Your Name</Label>
            <Input
              id="product-username"
              type="text"
              value={formData.userName}
              onChange={(e) => setFormData(prev => ({ ...prev, userName: e.target.value }))}
              placeholder="Enter your name"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Product Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value, subcategory: '' }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose category" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(productCategories).map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Subcategory</Label>
              <Select 
                value={formData.subcategory} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, subcategory: value }))}
                disabled={!formData.category}
              >
                <SelectTrigger>
                  <SelectValue placeholder={formData.category ? "Select subcategory" : "Select category first"} />
                </SelectTrigger>
                <SelectContent>
                  {availableSubcategories.map(subcategory => (
                    <SelectItem key={subcategory} value={subcategory}>
                      {subcategory}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="product-price">Price</Label>
            <Input
              id="product-price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
              placeholder="Enter price"
            />
          </div>

          <div>
            <Label htmlFor="product-description">Product Description</Label>
            <Textarea
              id="product-description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe the product, including material, size, and other important details..."
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="product-usage">Usage Tips for Cooking</Label>
            <Textarea
              id="product-usage"
              value={formData.usageTips}
              onChange={(e) => setFormData(prev => ({ ...prev, usageTips: e.target.value }))}
              placeholder="Share tips on how to best use this product in the kitchen..."
              rows={3}
            />
          </div>

          <div>
            <Label>Suitable Cooking Techniques</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {cookingTechniques.map(technique => (
                <span
                  key={technique}
                  className={`rounded-full px-3 py-1 text-sm cursor-pointer ${
                    formData.techniques.includes(technique)
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                  onClick={() => toggleTechnique(technique)}
                >
                  {technique}
                </span>
              ))}
            </div>
          </div>

          <div>
            <Label>Alternative Products</Label>
            <div className="flex space-x-2 mt-2">
              <Input
                type="text"
                placeholder="Add an alternative product"
                value={newAlternative}
                onChange={(e) => setNewAlternative(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAlternative())}
              />
              <Button onClick={addAlternative} size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
            
            {formData.alternatives.length > 0 && (
              <div className="mt-2 space-y-2">
                {formData.alternatives.map((alternative, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span>{alternative}</span>
                    <Button onClick={() => removeAlternative(index)} size="sm" variant="ghost">
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <PostMention onSelect={addMention} currentType="product" />

          {formData.mentionedPosts.length > 0 && (
            <div>
              <Label>Compatible Recipes</Label>
              <div className="space-y-2 mt-2">
                {formData.mentionedPosts.map(post => (
                  <div key={post.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span>{post.title}</span>
                    <Button
                      onClick={() => removeMention(post.id)}
                      size="sm"
                      variant="ghost"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button onClick={handleSubmit} className="w-full">
            Create Product Post
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}