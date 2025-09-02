<template>
    <IkApp>
        <IkAppContent>
            test {{ now.format('YYYY') }}
        </IkAppContent>
    </IkApp>
</template>
<script lang="ts" setup>
import { IkApp, IkAppContent } from '@ikol/ui-kit/components/IkApp';
import { time } from '@ikol/ui-kit/classes/dates';

const now = time();

</script>