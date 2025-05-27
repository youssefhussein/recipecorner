import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Post } from '@/types';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
//just renaming post to postdata
interface Props {
    postData: Post;
}

export default function CommentForm({ postData }: Props) {
    const { data, setData, post, errors, reset } = useForm({
        body: '',
        rating: 0,
        post_id: postData.id,
    });
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log('Form Data:', data.rating);
        post(route('comment.store'));
        if (errors.body) {
            console.log('Error sending data:', errors.body);
        }
        reset();
    };
    return (
        <form onSubmit={submit} method="Post">
            <div className="flex flex-row gap-2 space-y-1.5 pt-4">
                <Input
                    aria-placeholder={'Comment here'}
                    id="comment"
                    placeholder="Leave your Comment here"
                    value={data.body}
                    onChange={(e) => setData('body', e.target.value)}
                />
                <Select name="rating" value={data.rating.toString()} onValueChange={(value) => setData('rating', parseInt(value))}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a rating" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Rating</SelectLabel>
                            <SelectItem value="0">Pick a rating</SelectItem>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="4">4</SelectItem>
                            <SelectItem value="5">5</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Button type={'submit'} variant={'default'}>
                    Comment
                </Button>
            </div>
        </form>
    );
}
