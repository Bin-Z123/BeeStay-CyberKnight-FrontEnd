<template>
    <Dialog>
        <DialogContent @pointer-down-outside.prevent @escape-key-down.prevent>
            <form action="">
                <DialogHeader>
                    <DialogTitle class="font-bold text-muesli-400">Đặt Phòng</DialogTitle>
                    <hr class="text-muesli-400 bg-muesli-400 h-[2px]" />
                </DialogHeader>
                <div>

                </div>
                <DialogFooter>
                    <Button type="submit" class="bg-muesli-400 hover:bg-muesli-600 text-white">
                        Lưu
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
</template>
<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
</script>