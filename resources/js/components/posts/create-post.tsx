import { useForm } from 'react-hook-form';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function CreatePostForm() {
    const form = useForm();
    return (
        <>
            <div>
                <form action="post">
                    <Label htmlFor="recipe"> Share your recipe with the world</Label>
                   <Input id='recipe' type='text'></Input>
                   <Input id='recipe' type='text'></Input>
                   
                   <Input name='ingredients' id='recipe' type='text'></Input>
                  
                   <Input id='recipe' type='text'></Input>
                   <Input id='recipe' type='text'></Input>
                </form>
            </div>
        </>
    );
}
