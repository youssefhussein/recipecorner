import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function CreatePostForm() {
    const { data, setData, post, processing } = useForm({
        recipename: '',
        ingredients: '',
        description: '',
        categories: '',
    });
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log('Form Data:', data); // DEBUG: Check data before sending
        post(route('post.store'), {
            onSuccess: () => {
                console.log('Data successfully sent');
            },
            onError: (error) => {
                console.log('Error sending data:', error);
            },
        });
    };
    return (
        <>
            <div>
                <form onSubmit={submit} method="Post">
                    <Label htmlFor="recipe"> Share your recipe with the world</Label>

                    <Input
                        name="recipename"
                        id="recipe"
                        type="text"
                        value={data.recipename}
                        onChange={(e) => setData('recipename', e.target.value)}
                    ></Input>
       <Label htmlFor="ingredients"> Share recipe ingredients with the world</Label>

                    <Input

                        name="ingredients"
                        id="ingredients"
                        type="text"
                        value={data.ingredients}
                        onChange={(e) => setData('ingredients', e.target.value)}
                    ></Input>
        <Label htmlFor="description"> Write the description of your recipe</Label>

                    <Input id="description" type="text" value={data.description} onChange={(e) => setData('description', e.target.value)}></Input>
                    <Select name="categories" value={data.categories} onValueChange={(value) => setData('categories', value)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                  
                            <SelectGroup>     

                                <SelectLabel>Categories</SelectLabel>
                                <SelectItem value="breakfast">Breakfast</SelectItem>
                                <SelectItem value="dessert">Dessert</SelectItem>
                                <SelectItem value="lunch">Lunch</SelectItem>
                                <SelectItem value="dinner">Dinner</SelectItem>
                                <SelectItem value="vegetarian">Vegetarian</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Button type="submit" className="w-full" disabled={processing}>
                        {processing ? 'Submitting...' : 'Submit'}
                    </Button>{' '}
                </form>
            </div>
        </>
    );
}
